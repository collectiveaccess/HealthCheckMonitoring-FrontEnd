import React from "react";
import { Project } from "@/types";
import dynamic from "next/dynamic";

// use dynamic import to avoid "document not defined error" since the delete
// button needs access to bootstrap.Modal
const DeleteProjectButton = dynamic(() => import("./DeleteProjectButton"), {
  ssr: false,
});

type Props = {
  project: Project;
};
export default function DeleteProjectModal(props: Props) {
  const { project } = props;

  return (
    <div
      className="modal fade"
      id="exampleModal"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Delete {project.name}
            </h1>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <DeleteProjectButton project={project} />
          </div>
        </div>
      </div>
    </div>
  );
}
