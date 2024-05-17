"use client";

import { Modal } from "bootstrap";
import React from "react";
import { useRouter } from "next/navigation";
import { Project } from "@/types";

type Props = {
  project: Project;
};
export default function DeleteProjectButton(props: Props) {
  const router = useRouter();
  const { project } = props;

  async function deleteHandler(e) {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_BASE}/projects/${project.id}`;
      const res = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await res.json();
      if (json.changes !== undefined) {
        if (typeof window !== "undefined") {
          // hide modal
          const modalEl = document.getElementById("exampleModal");
          if (modalEl) {
            const myModal = Modal.getInstance(modalEl);
            myModal.hide();
          }
          const modalBackgroundEls =
            document.querySelectorAll(".modal-backdrop");

          if (modalBackgroundEls) {
            modalBackgroundEls.forEach((el) => el.remove());
          }

          // redirect to home page
          router.refresh();
          // add id query to force home page to refetch data
          router.push(`/?id=` + project.id);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <button
      type="button"
      className="btn btn-danger"
      onClick={deleteHandler}
      // data-bs-dismiss="modal"
    >
      Delete
    </button>
  );
}
