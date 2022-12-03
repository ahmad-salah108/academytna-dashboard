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
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  styled,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ReplyIcon from "@mui/icons-material/Reply";
import { Link } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";

const columns = [
  { id: "name", label: "الرقم", minWidth: 170, align: "center" },
  { id: "code", label: "اسم الدورة", minWidth: 100, align: "center" },
  {
    id: "population",
    label: "اسم المادة",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "size",
    label: "المرحلة",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "asd",
    label: "السنة",
    minWidth: 170,
    align: "center",
    format: (value) => value.toFixed(2),
  },
  {
    id: "density",
    label: "الاجراءات",
    minWidth: 170,
    align: "center",
    format: (value) => value.toFixed(2),
  },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));

const Courses = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [file, setFile] = useState();
  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editCourse, setEditCourse] = useState({});
  const { register, handleSubmit } = useForm();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteCourse = (course)=>{
    fetch(`${process.env.REACT_APP_API}/api/course/${course.id}`, {
      method: "DELETE",
    }).then(res => res.json()).then(data => console.log(data)).catch(err => console.log(err))
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/api/teacher/all`)
      .then((res) => res.json())
      .then((data) => setTeachers(data.teachers));

    fetch(`${process.env.REACT_APP_API}/api/subject/all`)
      .then((res) => res.json())
      .then((data) => setSubjects(data.subjects));

    fetch(`${process.env.REACT_APP_API}/api/course/all`)
      .then((res) => res.json())
      .then((data) => {
        setAllCourses(data.courses);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Typography
        variant="h3"
        sx={{ marginBottom: "20px", marginTop: "-16px" }}
      >
        الدورات
      </Typography>
      <Button
        sx={{ marginBottom: "20px" }}
        color="success"
        variant="contained"
        onClick={() => setOpenAdd(true)}
      >
        + إضافة دورة
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
              <ClipLoader
                color={"#18a0fb"}
                loading={loading}
                size={80}
                cssOverride={{
                  display: "block",
                  marginInline: "auto",
                  borderWidth: "5px",
                }}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
              {allCourses
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((e, i) => (
                  <TableRow key={i+'a'} hover role="checkbox" tabIndex={-1}>
                    <TableCell align="center">{e.id}</TableCell>
                    <TableCell align="center">{e.title}</TableCell>
                    <TableCell align="center">{e.Subject.title}</TableCell>
                    <TableCell align="center">{e.Level.title}</TableCell>
                    <TableCell align="center">{e.Class.title}</TableCell>
                    <TableCell align="center">
                      <Tooltip title={"تعديل الدورة"} placement="bottom">
                        <Button onClick={() => {
                          setEditCourse(e);
                          setOpenEdit(true)
                          }}>
                          <EditIcon />
                        </Button>
                      </Tooltip>
                      <Tooltip
                        title={"الانتقال الى وحدات الدورة"}
                        placement="bottom"
                      >
                        <Link to={`${e.id}`}>
                          <Button>
                            <ReplyIcon />
                          </Button>
                        </Link>
                      </Tooltip>
                      
                      <Tooltip title={"حذف الدورة"} placement="bottom">
                        <Button onClick={()=>deleteCourse(e)} color={"danger"}>
                          <DeleteIcon />
                        </Button>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={allCourses.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {/* ADD DIALOG */}
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
        <form
          onSubmit={handleSubmit((data) => {
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("image", file);
            formData.append("price", parseInt(data.price));
            formData.append("TeacherId", data.TeacherId);
            formData.append("SubjectId", data.SubjectId);
            formData.append("goals", data.goals);
            console.log(file)

            fetch(`${process.env.REACT_APP_API}/api/course/create`, {
              method: "POST",
              body: formData,
            })
              .then((res) => res.json())
              .then((info) => {
                console.log(info);
              })
              .catch((err) => {
                console.log(err);
              });
          })}
        >
          <DialogTitle>إضافة دورة</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label={"اسم الدورة"}
              type="text"
              fullWidth
              variant="standard"
              {...register("title")}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label={"هدف الدورة"}
              type="text"
              fullWidth
              variant="standard"
              {...register("goals")}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label={"سعر الدورة"}
              type="number"
              fullWidth
              variant="standard"
              {...register("price")}
            />
            <FormControl fullWidth sx={{ marginTop: "20px" }}>
              <InputLabel id="demo-simple-select-label">اسم المادة</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label={"اسم المادة"}
                {...register("SubjectId")}
              >
                {subjects?.map((e, i) => (
                  <MenuItem key={e.id} value={e.id}>
                    {e.title}({e.Class.title})({e.Level.title})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ marginTop: "20px" }}>
              <InputLabel id="demo-simple-select-label">معلم الدورة</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label={"معلم الدورة"}
                {...register("TeacherId")}
              >
                {teachers?.map((e, i) => (
                  <MenuItem key={e.id} value={e.id}>
                    {e.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ marginTop: "20px" }}>
              <label>
                <Stack direction="row" spacing={2}>
                  <AddPhotoAlternateIcon
                    sx={{ color: "#18a0fb", fontSize: "30px" }}
                  />
                  <Typography variant="p" sx={{ padding: "5px" }}>
                    إضافة صورة
                  </Typography>
                  <input
                    onChange={(e) => setFile(e.target.files[0])}
                    style={{ display: "none" }}
                    type={"file"}
                  />
                </Stack>
              </label>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenAdd(false)}>إلغاء</Button>
            <Button type="submit" onClick={() => setOpenAdd(false)}>
              موافق
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      {/* EDIT DIALOG */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <form
          onSubmit={handleSubmit((data) => {
            fetch(`${process.env.REACT_APP_API}/api/course/${editCourse.id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                title: data.editTitle,
                goals: data.editGoals,
                TeacherId: data.editTeacher,
                price: data.editPrice,
              }),
            })
              .then((res) => res.json())
              .then((info) => {
                console.log(info);
              })
              .catch((err) => {
                console.log(err);
              });
          })}
        >
          <DialogTitle>تعديل دورة</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label={"اسم الدورة"}
              type="text"
              fullWidth
              defaultValue={editCourse.title}
              variant="standard"
              {...register("editTitle")}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label={"هدف الدورة"}
              type="text"
              fullWidth
              defaultValue={editCourse.goals}
              variant="standard"
              {...register("editGoals")}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label={"سعر الدورة"}
              type="number"
              fullWidth
              defaultValue={+editCourse.price}
              variant="standard"
              {...register("editPrice")}
            />
            <FormControl fullWidth sx={{ marginTop: "20px" }}>
              <InputLabel id="demo-simple-select-label">معلم الدورة</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label={"معلم الدورة"}
                defaultValue={editCourse.TeacherId}
                {...register("editTeacher")}
              >
                {teachers?.map((e, i) => (
                  <MenuItem key={e.id} value={e.id}>
                    {e.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEdit(false)}>إلغاء</Button>
            <Button type="submit" onClick={() => setOpenEdit(false)}>
              موافق
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default Courses;
