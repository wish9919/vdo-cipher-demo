import { AttachmentIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  List,
  ListIcon,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";

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

const UploadModal = ({ title = "Upload Video" }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [file, setFile] = useState(null);
  const [isUploading, setUploading] = useState(false);
  const toast = useToast();

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

  const onSubmit = async () => {
    if (!file) {
      return toast({
        title: "Please select a file",
        status: "error",
        isClosable: true,
      });
    }
  };

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
    <>
      <Button
        leftIcon={<AttachmentIcon />}
        ml={2}
        colorScheme={"blue"}
        onClick={onOpen}
      >
        {title}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent minW={"4xl"}>
          <ModalHeader>Drag & drop or select your video</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <section className="container">
              <div {...getRootProps({ className: "dropzone", style })}>
                <input {...getInputProps()} />
                <p>
                  Drag 'n' drop your video file here, or click to select a file
                </p>
              </div>
              <aside>
                <Box mt={2}>
                  <h4>Files</h4>
                  <List>{files}</List>
                </Box>
              </aside>
            </section>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={onSubmit} colorScheme={"green"} variant="solid">
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UploadModal;
