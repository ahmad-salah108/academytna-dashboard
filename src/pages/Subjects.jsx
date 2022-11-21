import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { theme } from "../theme";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  styled,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ReplyIcon from "@mui/icons-material/Reply";
import { Link } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import { useForm } from "react-hook-form";

const columns = [
  { id: "name", label: "الرقم", minWidth: 170, align: "center" },
  { id: "code", label: "اسم المادة", minWidth: 100, align: "center" },
  { id: "asd", label: "المرحلة", minWidth: 100, align: "center" },
  { id: "ghtr", label: "السنة الدراسية", minWidth: 100, align: "center" },
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
  const [openAdd, setOpenAdd] = React.useState(false);
  const [levels, setLevels] = useState([]);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [level, setLevel] = useState("1");
  const [myClass, setMyClass] = useState("1");
  const [subject, setSubject] = useState('');
  const [section, setSection] = useState('');
  const [allSubjects, setAllSubjects] = useState();
  // const { register, handleSubmit } = useForm();
  // const onSubmit = data => console.log(data);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    fetch("https://schools.rescue-palestine.com/api/level/all")
      .then((res) => res.json())
      .then((data) => setLevels(data.levels));

    fetch("https://schools.rescue-palestine.com/api/class/all")
      .then((res) => res.json())
      .then((data) => setClasses(data.classes));

    fetch("https://schools.rescue-palestine.com/api/section/all")
      .then((res) => res.json())
      .then((data) => setSections(data.sections));

    fetch("https://schools.rescue-palestine.com/api/subject/all")
      .then((res) => res.json())
      .then((data) => setAllSubjects(data.subjects));
  }, []);

  return (
    <div>
      <Button
        sx={{ marginBottom: "20px" }}
        color="success"
        variant="contained"
        onClick={() => setOpenAdd(true)}
      >
        + إضافة مادة
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
              {allSubjects?.map((e, i) => (
                <TableRow key={i} hover role="checkbox" tabIndex={-1}>
                  <TableCell align="center">{e.id}</TableCell>
                  <TableCell align="center">{e.title}</TableCell>
                  <TableCell align="center">{e.Level.title}</TableCell>
                  <TableCell align="center">{e.Class.title}</TableCell>
                </TableRow>
              ))}
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

      <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetch("https://schools.rescue-palestine.com/api/subject/create", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                title: subject,
                ClassId: myClass,
                LevelId: level,
                SectionId: section
              }),
            })
              .then((res) => res.json())
              .then((info) => {
                console.log(info)
              })
              .catch((err) => {
                console.log(err)
              });
          }}
        >
          <DialogTitle>إضافة مادة</DialogTitle>
          <DialogContent>
            {/* المرحلة */}
            <FormControl fullWidth sx={{ marginTop: "20px" }}>
              <InputLabel id="demo-simple-select-label">المرحلة</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label={"المرحلة"}
                onChange={(e) => setLevel(e.target.value)}
                defaultValue="1"
              >
                {levels?.map((e, i) => (
                  <MenuItem key={e.id} value={e.id}>
                    {e.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* السنة الدراسية */}
            <FormControl fullWidth sx={{ marginTop: "20px" }}>
              <InputLabel id="demo-simple-select-label">
                السنة الدراسية
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label={"السنة الدراسية"}
                onChange={(e) => setMyClass(e.target.value)}
              >
                {classes
                  .filter((e) => e.LevelId == level)
                  ?.map((e, i) => (
                    <MenuItem key={e.id} value={e.id}>
                      {e.title}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            {/* الشعبة */}
            <FormControl fullWidth sx={{ marginTop: "20px" }}>
              <InputLabel id="demo-simple-select-label">الشعبة</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label={"الشعبة"}
                onChange={e => setSection(e.target.value)}
              >
                {level == "3" &&
                  sections
                    .filter((e) => e.ClassId == myClass)
                    ?.map((e, i) => (
                      <MenuItem key={e.id} value={e.id}>
                        {e.title}
                      </MenuItem>
                    ))}
              </Select>
            </FormControl>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label={"اسم المادة"}
              type="text"
              fullWidth
              variant="standard"
              onChange={e => setSubject(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={()=>setOpenAdd(false)}>إلغاء</Button>
            <Button type={"submit"} onClick={() => setOpenAdd(false)}>
              موافق
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default Courses;
