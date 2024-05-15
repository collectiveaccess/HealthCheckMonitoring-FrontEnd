export interface NewProject {
  name: string;
  url: string;
  notes: string | null;
  client_name: string;
  cluster_name: string;
  slack_alert: number;
  email_alert: number;
  check_frequency: number;
}

export interface Project extends NewProject {
  id: number;
  status: number;
  created_at: string;
}

export type Status = {
  id: number;
  project_id: number;
  status: number;
  error_message?: string;
  created_at: string;
};
