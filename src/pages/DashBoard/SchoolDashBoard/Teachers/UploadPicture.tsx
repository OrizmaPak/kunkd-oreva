import Button from "@/components/Button";
import { useState } from "react";
import { Text } from "@mantine/core";
import { Dropzone, FileWithPath } from "@mantine/dropzone";

import DragIcon from "@/assets/draganddropicon.svg";
import CameraIcon from "@/assets/cameralogo.svg";
import { motion } from "framer-motion";
import { Loader } from "@mantine/core";

const UploadPicture = ({
  // toggle,
  isLoading,
  btnTitle,
  handleSubmit,
}: {
  // toggle: () => void;
  btnTitle: string;
  isLoading?: boolean;
  handleSubmit?: (val: File) => void;
}) => {
  const [files, setFiles] = useState<FileWithPath[]>([]);

  console.log(files);
  const handleClick = () => {
    if (handleSubmit) handleSubmit(files[0] as File)!;
  };
  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <p className="relative  flex items-center justify-center">
        <img
          key={index}
          src={imageUrl}
          className="rounded-full w-[200px] h-[200px]  object-cover"
        />
        <span className="absolute  bottom-5 right-0 bg-white rounded-full p-4">
          <img
            loading="lazy"
            src={CameraIcon}
            alt="camera"
            className="w-[30px]"
          />
        </span>
      </p>
    );
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="px-5">
        <h1 className="font-bold font-Recoleta text-center text-[30px] my-3">
          Upload Profile Picture
        </h1>
        <Dropzone onDrop={setFiles}>
          <Text align="center">
            <div className="flex gap-4">
              <span className="flex-grow ">
                <p className="w-[250px]">
                  {files && previews}
                  {files.length < 1 && (
                    <img loading="lazy" src={DragIcon} alt="drag and drop" />
                  )}
                </p>
              </span>
              <span className="flex-grow flex flex-col justify-center items-center">
                <span className="font-bold">
                  Drop your photo here
                  <span className="text-[#8530C1]"> or Select a file</span>
                </span>
                <span>Supports: JPG, PNG.</span>
              </span>
            </div>
          </Text>
        </Dropzone>
        <div className="max-w-[70%] mx-auto my-4">
          <Button onClick={handleClick}>
            {isLoading ? (
              <p className="flex justify-center items-center">
                <Loader color="white" size="sm" />
              </p>
            ) : (
              <span>{btnTitle}</span>
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default UploadPicture;
