export function formatProjectStatus(status: number) {
  if (status === 0) {
    return "down";
  } else if (status === 1) {
    return "up";
  }
}

export function formatProjectStatusClass(status: number) {
  if (status === 0) {
    return "p-1 text-danger-emphasis bg-danger-subtle";
  } else if (status === 1) {
    return "p-1 text-success-emphasis bg-success-subtle";
  }
}
