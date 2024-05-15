"use client";
import React from "react";
import { useForm } from "react-hook-form";
import TextInput from "@/components/Form/TextInput";
import CheckboxInput from "@/components/Form/CheckboxInput";
import { NewProject } from "@/types";
import { useRouter } from "next/navigation";

export default function ProjectForm() {
  const formObj = useForm();
  const { handleSubmit } = formObj;
  const router = useRouter();

  async function createProject(data: any) {
    let notes = data.notes.trim();
    const requestBody: NewProject = {
      name: data.projectName.trim(),
      url: data.url.trim(),
      notes: notes === "" ? null : notes,
      client_name: data.clientName.trim(),
      cluster_name: data.clusterName.trim(),
      email_alert: data.emailAlert === true ? 1 : 0,
      slack_alert: data.slackAlert === true ? 1 : 0,
      check_frequency: data.checkFrequency.trim(),
    };

    try {
      const res = await fetch(`/api/projects/`, {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await res.json();
      if (json.result && json.result.lastInsertRowid) {
        router.push(`/projects/${json.result.lastInsertRowid}`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit(createProject)}>
      <div className="mb-3">
        <TextInput
          label="Name"
          id="projectName"
          required={true}
          formObj={formObj}
        />
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
          id="clientName"
          required={true}
          formObj={formObj}
        />
      </div>
      <div className="mb-3">
        <TextInput
          label="Cluster name"
          id="clusterName"
          required={true}
          formObj={formObj}
        />
      </div>
      <div className="mb-3">
        <CheckboxInput
          label="Email notification"
          id="emailAlert"
          formObj={formObj}
        />
      </div>
      <div className="mb-3">
        <CheckboxInput
          label="Slack notification"
          id="slackAlert"
          formObj={formObj}
        />
      </div>
      <div className="mb-3">
        <TextInput
          label="Check frequency"
          id="checkFrequency"
          required={true}
          formObj={formObj}
          type="number"
        />
      </div>
      <input type="submit" />
    </form>
  );
}
