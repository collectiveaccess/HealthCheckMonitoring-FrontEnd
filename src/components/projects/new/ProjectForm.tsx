"use client";
import React from "react";
import { useForm } from "react-hook-form";
import TextInput from "@/components/ui/form/TextInput";
import CheckboxInput from "@/components/ui/form/CheckboxInput";
import { NewProject } from "@/types";
import { useRouter } from "next/navigation";

export default function ProjectForm() {
  const formObj = useForm();
  const { handleSubmit } = formObj;
  const router = useRouter();

  async function createProject(data: any) {
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
      const url = `${process.env.NEXT_PUBLIC_API_BASE}/projects`;
      const res = await fetch(url, {
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
