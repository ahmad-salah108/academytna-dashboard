import React from 'react'
import {DialogTitle,TextField,DialogContent,DialogActions,Button} from '@mui/material'
import { useForm } from "react-hook-form";

export default function OpenQuestionDialog({setOpenQuestion,examId}) {
    const { register, handleSubmit } = useForm();
    return (
        <div>
            <form
            onSubmit={handleSubmit((data) => {
                if(data.rightAnswer!==data.answer1&&data.rightAnswer!==data.answer2&&data.rightAnswer!==data.answer3&&data.rightAnswer!==data.answer4)
                {
                    alert('الرجاء ادخال اجابة صحيحة')
                    return
                }
                fetch(`${process.env.REACT_APP_API}/api/exam/question/create/${examId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    question:data.question,
                    rightAnswer:data.rightAnswer,
                    answer1:data.answer1,
                    answer2:data.answer2,
                    answer3:data.answer3,
                    answer4:data.answer4
                }),
                })
                .then((res) => res.json())
                .then((info) => {
                    console.log(info);
                    window.location.reload()
                })
                .catch((err) => {
                    console.log(err);
                });
            })}
            >
            <DialogTitle>إضافة سؤال</DialogTitle>
            <DialogContent>
                <TextField
                autoFocus
                margin="dense"
                id="name"
                label={"اسم السؤال"}
                type="text"
                fullWidth
                variant="standard"
                {...register("question")}
                />
                <TextField
                autoFocus
                margin="dense"
                id="name"
                label={"الإجابة الأولى"}
                type="text"
                fullWidth
                variant="standard"
                {...register("answer1")}
                />
                <TextField
                autoFocus
                margin="dense"
                id="name"
                label={"الإجابة الثانية"}
                type="text"
                fullWidth
                variant="standard"
                {...register("answer2")}
                />
                <TextField
                autoFocus
                margin="dense"
                id="name"
                label={"الإجابة الثالثة"}
                type="text"
                fullWidth
                variant="standard"
                {...register("answer3")}
                />
                <TextField
                autoFocus
                margin="dense"
                id="name"
                label={"الإجابة الرابعة"}
                type="text"
                fullWidth
                variant="standard"
                {...register("answer4")}
                />
                <TextField
                autoFocus
                margin="dense"
                id="name"
                label={"الإجابة الصحيحة"}
                type="text"
                fullWidth
                variant="standard"
                {...register("rightAnswer")}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpenQuestion(false)}>إلغاء</Button>
                <Button type="submit">
                موافق
                </Button>
            </DialogActions>
            </form>
        </div>
    )
}