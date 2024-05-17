"use client";

import { Project, Status } from "@/types";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { formatProjectStatus, formatProjectStatusClass } from "@/lib/ui_utils";

type Props = {
  project: Project;
  statuses: Status[];
  statusesCount: number;
  perPage: number;
};

export default function ProjectStatus(props: Props) {
  const { project, statuses, statusesCount, perPage } = props;
  const [displayStatuses, setDisplayStatuses] = useState(statuses);
  const [displayStatusesCount, setDisplayStatusesCount] =
    useState(statusesCount);

  const pageCount = Math.ceil(displayStatusesCount / perPage);

  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_API_BASE}/project_status/${project.id}?offset=0`;
    const intervalId = setInterval(
      () => {
        fetch(url)
          .then((res) => res.json())
          .then((json) => {
            setDisplayStatuses(json.data);
            setDisplayStatusesCount(json.count);
          });
      },
      Number(process.env.NEXT_PUBLIC_UPDATE_FREQUENCY_MINUTES) * 60 * 1000,
    );

    return () => {
      clearInterval(intervalId);
    };
  }, [project.id]);

  const handlePageClick = async (event: any) => {
    const offset = event.selected * perPage;
    const url = `${process.env.NEXT_PUBLIC_API_BASE}/project_status/${project.id}?offset=${offset}`;

    const res = await fetch(url);
    const json = await res.json();
    setDisplayStatuses(json.data);
    setDisplayStatusesCount(json.count);
  };

  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Status</th>
            <th>Date</th>
            <th>Error</th>
          </tr>
        </thead>
        <tbody>
          {displayStatuses.map((status) => (
            <tr key={status.id}>
              <td>
                <span className={formatProjectStatusClass(status.status)}>
                  {formatProjectStatus(status.status)}
                </span>
              </td>
              <td>{status.created_at}</td>
              <td>{status.error_message}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {pageCount > 0 && (
        <ReactPaginate
          containerClassName="pagination"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          onPageChange={handlePageClick}
          pageCount={pageCount}
          activeClassName="active"
        />
      )}
    </>
  );
}
