"use client";
import Layers from "./layer/Layers";
import { ModeToggle } from "./ui/themeToggle";
import UploadImage from "./uploadImage";
import ActiveImage from "./ActiveImage";
import UploadImageForm from "./UploadImageForm";

export default function Editor() {
  return (
    <div className="flex h-full">
      <div className="py-6 px-4  min-w-48 ">
        <div className="pb-12 text-center">
          <ModeToggle />
        </div>
      </div>
      <UploadImageForm />
      <ActiveImage />
      <Layers />
    </div>
  );
}
