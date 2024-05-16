"use client";
import React from "react";
import { useForm } from "react-hook-form";
import TextInput from "@/components/ui/form/TextInput";
import CheckboxInput from "@/components/ui/form/CheckboxInput";
import { NewProject, Project } from "@/types";
import { useRouter } from "next/navigation";

type Props = {
  project: Project;
};
export default function ProjectForm(props: Props) {
  const { project } = props;
  const formObj = useForm({
    defaultValues: {
      name: project.name,
      url: project.url,
      notes: project.notes,
      client_name: project.client_name,
      cluster_name: project.cluster_name,
      email_alert: project.email_alert,
      slack_alert: project.slack_alert,
      check_frequency: project.check_frequency,
    },
  });
  const { handleSubmit } = formObj;
  const router = useRouter();

  async function editProject(data: any) {
    let notes = data.notes.trim();
    const requestBody: NewProject = {
      name: data.name.trim(),
      url: data.url.trim(),
      notes: notes === "" ? null : notes,
      client_name: data.client_name.trim(),
      cluster_name: data.cluster_name.trim(),
      email_alert: data.email_alert === true ? 1 : 0,
      slack_alert: data.slack_alert === true ? 1 : 0,
      check_frequency: data.check_frequency,
    };

    try {
      const url = `${process.env.NEXT_PUBLIC_API_BASE}/projects/${project.id}`;
      const res = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await res.json();
      if (json.result && json.result.changes === 1) {
        // NOTE: add router.refresh() so NEXT.js will render the page dynamically
        // instead of using cache  https://stackoverflow.com/a/78012334
        router.refresh();
        router.push(`/projects/${project.id}`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit(editProject)}>
      <div className="mb-3">
        <TextInput label="Name" id="name" required={true} formObj={formObj} />
      </div>
      <div className="mb-3">
        <TextInput
          label="URL"
          id="url"
          required={true}
          formObj={formObj}
          type="url"
        />
      </div>
      <div className="mb-3">
        <TextInput label="Notes" id="notes" formObj={formObj} />
      </div>
      <div className="mb-3">
        <TextInput
          label="Client name"
          id="client_name"
          required={true}
          formObj={formObj}
        />
      </div>
      <div className="mb-3">
        <TextInput
          label="Cluster name"
          id="cluster_name"
          required={true}
          formObj={formObj}
        />
      </div>
      <div className="mb-3">
        <CheckboxInput
          label="Email notification"
          id="email_alert"
          formObj={formObj}
        />
      </div>
      <div className="mb-3">
        <CheckboxInput
          label="Slack notification"
          id="slack_alert"
          formObj={formObj}
        />
      </div>
      <div className="mb-3">
        <TextInput
          label="Check frequency"
          id="check_frequency"
          required={true}
          formObj={formObj}
          type="number"
        />
      </div>
      <input type="submit" />
    </form>
  );
}
