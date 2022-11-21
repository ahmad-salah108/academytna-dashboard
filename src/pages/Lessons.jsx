import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { theme } from "../theme";
import { Button, styled } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ReplyIcon from "@mui/icons-material/Reply";
import { Link } from "react-router-dom";
import Dialog from './../components/Dialog'

const columns = [
  { id: "name", label: "الرقم", minWidth: 170, align: "center" },
  { id: "code", label: "اسم الدرس", minWidth: 100, align: "center" },
  {
    id: "population",
    label: "محتوى الدرس",
    minWidth: 170,
    align: "center",
  },
  {
    id: "population",
    label: "وصف الدرس",
    minWidth: 170,
    align: "center",
  },
  // {
  //   id: 'size',
  //   label: 'المرحلة',
  //   minWidth: 170,
  //   align: 'center',
  //   format: (value) => value.toLocaleString('en-US'),
  // },
  // {
  //   id: 'density',
  //   label: 'السنة',
  //   minWidth: 170,
  //   align: 'center',
  //   format: (value) => value.toFixed(2),
  // },
  {
    id: "density",
    label: "الاجراءات",
    minWidth: 170,
    align: "center",
  },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData("India", "IN", 1324171354, 3287263),
  createData("China", "CN", 1403500365, 9596961),
  createData("Italy", "IT", 60483973, 301340),
  createData("United States", "US", 327167434, 9833520),
  createData("Canada", "CA", 37602103, 9984670),
  createData("Australia", "AU", 25475400, 7692024),
  createData("Germany", "DE", 83019200, 357578),
  createData("Ireland", "IE", 4857000, 70273),
  createData("Mexico", "MX", 126577691, 1972550),
  createData("Japan", "JP", 126317000, 377973),
  createData("France", "FR", 67022000, 640679),
  createData("United Kingdom", "GB", 67545757, 242495),
  createData("Russia", "RU", 146793744, 17098246),
  createData("Nigeria", "NG", 200962417, 923768),
  createData("Brazil", "BR", 210147125, 8515767),
];

const Courses = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <Button sx={{ marginBottom: "20px" }} color="success" variant="contained" onClick={() => setOpenAdd(true)}>
        + إضافة درس
      </Button>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <StyledTableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow hover role="checkbox" tabIndex={-1}>
                {/* <TableCell align='center'>
                          شسي
                        </TableCell>
                        <TableCell align='center'>
                          شسي
                        </TableCell> */}
                <TableCell align="center">شسي</TableCell>
                <TableCell align="center">شسي</TableCell>
                <TableCell align="center">شسي</TableCell>
                <TableCell align="center">شسي</TableCell>
                <TableCell align="center">
                  <Button onClick={() => setOpenEdit(true)}>
                    <EditIcon />
                  </Button>
                  <Button color={'danger'}>
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Dialog open={openAdd} handleClose={() => setOpenAdd(false)} inputs={['اسم الدرس', 'محتوى الدرس', 'وصف الدرس']} title={'إضافة درس'}/>
      <Dialog open={openEdit} handleClose={() => setOpenEdit(false)} inputs={['اسم الدرس', 'محتوى الدرس', 'وصف الدرس']} title={'تعديل درس'}/>
    </div>
  );
};

export default Courses;
