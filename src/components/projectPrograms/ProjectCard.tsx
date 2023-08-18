"use client";

import { Project } from "@/types/types";
import { getImageSrc } from "@/utils/getImageSrc";
import Image from "next/image";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";

interface Props {
  project: Project;
}

export default function ProjectCard({ project }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col justify-between p-3 mt-4 shadow-container">
      <Image
        src={getImageSrc(project.image)}
        alt={project.name + " thumbnail"}
        className="flex-wrap object-cover w-full h-full rounded"
        height={100}
        unoptimized
        width={100}
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <button className="w-full px-4 py-3 mt-8 text-sm font-medium uppercase transition-all rounded text-blue hover:bg-blue hover:text-white">
            {project.name}
          </button>
        </DialogTrigger>
        <DialogContent className="max-h-[80vh] overflow-y-scroll">
          <DialogHeader className="font-semibold">{project.name}</DialogHeader>
          <div className="w-full divider bg-gray" />
          <div>
            <p>{project.description}</p>

            <div className="flex flex-col items-center gap-2 mt-2">
              {project.reportLink && (
                <>
                  <h5 className="mt-10 text-center">Useful Links:</h5>
                  <a
                    className="text-purple hover:underline"
                    href={project.reportLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Report
                  </a>
                </>
              )}

              {project.githubLink && (
                <a
                  className="text-purple hover:underline"
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github Link
                </a>
              )}

              {project.demoLink && (
                <a
                  className="text-purple hover:underline"
                  href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Demo Link
                </a>
              )}
            </div>
          </div>

          <div className="w-full divider bg-gray" />

          <DialogFooter>
            <button
              className="px-4 py-2 text-white rounded bg-blue hover:bg-blue/90"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
