import React, { useEffect } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { studentActions } from "../studentSlice";

export default function ListPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      studentActions.fetchStudentList({
        _page: 1,
        _limit: 15,
      })
    );
  }, []);
  return <div>Student List Page</div>;
}
