export type Project = {
  id: number;
  name: string;
  url: string;
  notes: string;
  client_name: string;
  cluster_name: string;
  status: number;
  slack_alert: number;
  email_alert: number;
  check_frequency: number;
  created_at: string;
};

