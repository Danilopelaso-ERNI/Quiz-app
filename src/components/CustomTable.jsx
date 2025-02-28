// components/CustomTable.jsx
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const CustomTable = ({ data, onEdit, onDelete }) => {
  return (
    <Table className="w-full min-w-[600px]">
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Question</TableHead>
          <TableHead className="text-center">Answers</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data && data.length > 0 ? (
          data.map((q, index) => (
            <TableRow key={index} className="">
              <TableCell className="">
                {q.text}
              </TableCell>
              <TableCell className="text-center">
                <ul>
                  {q.answers && q.answers.length > 0 ? (
                    q.answers.map((a, i) => (
                      <li
                        key={i}
                        className={a.isCorrect ? "font-bold" : ""}
                      >
                        {a.text}
                      </li>
                    ))
                  ) : (
                    <li>No answers available.</li>
                  )}
                </ul>
              </TableCell>
              <TableCell className="text-center">
                <Button
                  className="m-2 hover:bg-yellow-400 "
                  variant="outline"
                  onClick={() => onEdit(index)}
                >
                  Edit
                </Button>
                <Button
                  variant="outline"
                  className="ml-2 hover:bg-red-700 hover:text-white"
                  onClick={() => onDelete(index)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan="3" className="text-center pt-5">
              No sets of quizzes are available yet.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default CustomTable;