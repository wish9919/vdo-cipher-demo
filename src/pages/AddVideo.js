import { ArrowBackIcon, AttachmentIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  List,
  ListItem,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { PlayerAPI } from "../data";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
  minHeight: 250,
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const AddVideo = () => {
  const [uploadData, setUploadData] = useState(null);
  const [obtaining, setObtaining] = useState(false);

  const [file, setFile] = useState(null);
  const [isUploading, setUploading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const toast = useToast();
  const navigate = useNavigate();

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: {
      "video/*": [],
    },
    maxFiles: 1,
    multiple: false,
    onDropAccepted: (files) => {
      setFile(files[0]);
    },
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  async function onSubmit(values) {
    setObtaining(true);
    PlayerAPI.obtainUpload(values.title)
      .then((res) => {
        setUploadData(res.data);
        setObtaining(false);
      })
      .catch((err) => {
        setObtaining(false);
        toast({
          status: "error",
          title: err?.response?.data?.message || "Something went wrong!",
        });
      });
  }

  async function handleUpload() {
    if (!file) {
      return toast({
        title: "Please select video file",
        status: "error",
      });
    }

    setUploading(true);
    const formData = new FormData();

    formData.append(
      "x-amz-credential",
      uploadData["clientPayload"]["x-amz-credential"]
    );
    formData.append(
      "x-amz-algorithm",
      uploadData["clientPayload"]["x-amz-algorithm"]
    );
    formData.append("x-amz-date ", uploadData["clientPayload"]["x-amz-date"]);
    formData.append(
      "x-amz-signature",
      uploadData["clientPayload"]["x-amz-signature"]
    );
    formData.append("key", uploadData["clientPayload"]["key"]);
    formData.append("policy", uploadData["clientPayload"]["policy"]);
    formData.append("success_action_status", 201);
    formData.append("success_action_redirect", "");
    formData.append("file", file);

    await axios
      .post(uploadData["clientPayload"]["uploadLink"], formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setUploading(false);
        toast({
          status: "success",
          title: "Successfully Uploaded!",
        });

        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        toast({
          status: "error",
          title: "Something went wrong!",
        });
      });
  }

  const files = acceptedFiles.map((file) => (
    <ListItem
      display={"flex"}
      alignItems="center"
      px={4}
      py={2}
      bg={"gray.50"}
      borderRadius={10}
      key={file.path}
    >
      <AttachmentIcon mr={2} /> {file.path} - {file.size} bytes
    </ListItem>
  ));

  return (
    <Layout>
      <Container paddingY={10} maxW="6xl">
        <Button
          onClick={() => navigate("/")}
          leftIcon={<ArrowBackIcon />}
          mb={4}
        >
          Go back
        </Button>
        <Heading>Add Video</Heading>

        <Box maxW={"4xl"} mt={5}>
          {!uploadData ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={errors.title}>
                <FormLabel htmlFor="title">Video Title</FormLabel>
                <Input
                  {...register("title", {
                    required: "Video title is required",
                  })}
                  id="title"
                  type="text"
                />
                <FormErrorMessage>
                  {errors.title && errors.title.message}
                </FormErrorMessage>
              </FormControl>

              <Button
                disabled={obtaining}
                isLoading={obtaining}
                loadingText="Obtaining..."
                mt={4}
                type="submit"
                colorScheme={"blue"}
              >
                Obtain Upload Credentials
              </Button>
            </form>
          ) : (
            <>
              <Alert borderRadius={10} status="success">
                <AlertIcon />
                Successfully Obtained, Now you can upload your video
              </Alert>

              <Box mt={5}>
                <section className="container">
                  <div {...getRootProps({ className: "dropzone", style })}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop your video file here, or click to select a
                      file
                    </p>
                  </div>
                  <aside>
                    <Box mt={2}>
                      <h4>Files</h4>
                      <List>{files}</List>
                    </Box>
                  </aside>
                </section>

                <Button
                  mt={4}
                  onClick={handleUpload}
                  float={"right"}
                  loadingText="Uploading..."
                  isLoading={isUploading}
                  disabled={isUploading}
                  colorScheme={"blue"}
                >
                  Upload Video
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Container>
    </Layout>
  );
};

export default AddVideo;
