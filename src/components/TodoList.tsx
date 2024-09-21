"use client";
import {
    useDeleteTodoMutation,
    useDeleteTodosMutation,
    useGetTodoQuery,
    usePostTodoMutation,
    useUpdateTodoMutation,
} from "@/redux/api/todo";
import { useUploadFileMutation } from "@/redux/api/upload";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import scss from "./TodoList.module.scss";
import { wrap } from "node:module";
const TodoList = () => {
    const {
        register: registerAdd,
        handleSubmit: handleSubmitAdd,
        reset,
    } = useForm<IForm>();
    const {
        register: registerEdit,
        handleSubmit: handleSubmitEdit,
        setValue,
    } = useForm<IForm>();

    const { data: getTodos = [] } = useGetTodoQuery();
    const [postTodo] = usePostTodoMutation();
    const [editTodo] = useUpdateTodoMutation();
    const [deleteTodo] = useDeleteTodoMutation();
    const [deleteTodos] = useDeleteTodosMutation();
    const [uploadFile] = useUploadFileMutation();

    const [editId, setEditId] = useState<number | null>(null);
    const [todos, setTodos] = useState<IForm[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const onSubmit: SubmitHandler<IForm> = async (data) => {
        console.log(data.file);
        const file = data.file[0];
        const newFormData = new FormData();
        newFormData.append("file", file);
        const { data: responseImg } = await uploadFile(newFormData);

        const newData = {
            name: data.name,
            age: data.age,
            file: responseImg?.url!,
        };
        const { data: responseData } = await postTodo(newData);
        setTodos(responseData!);
        reset();
    };

    const onEdit: SubmitHandler<IForm> = async (data) => {
        console.log(data);
        const file = data.file[0];
        const newFormData = new FormData();
        newFormData.append("file", file);
        const { data: responseImg } = await uploadFile(newFormData);

        const newData = {
            name: data.name,
            age: data.age,
            file: responseImg?.url!,
        };

        const updateData = {
            _id: editId!,
            data: newData,
        };
        const { data: responseData } = await editTodo(updateData);
        setTodos(responseData!);
        setEditId(null);
    };

    const deleteHandler = async (id: number) => {
        const { data: responseData } = await deleteTodo(id);
        setTodos(responseData!);
    };

    const deleteAllHandler = async () => {
        await deleteTodos();
    };

    const fetchTodos = () => {
        setTodos(getTodos);
    };
    useEffect(() => {
        fetchTodos();
    }, [getTodos]);

    return (
        <div className={scss.wrap}>
            <h1 className={scss.wrap_title}> TODO LIST</h1>
            <form onSubmit={handleSubmitAdd(onSubmit)} className={scss.addForm}>
                <input
                    className={scss.item_input}
                    type="text"
                    placeholder="name"
                    {...registerAdd("name", { required: true })}
                />
                <input
                    className={scss.item_input}
                    type="text"
                    placeholder="age"
                    {...registerAdd("age", { required: true })}
                />
                <input
                    className={scss.item_input}
                    type="file"
                    placeholder="file"
                    {...registerAdd("file", { required: true })}
                />
                {/* {isLoadin?(<></>):(<></>)} */}
                <button type="submit" className={scss.add_btn}>
                    Add
                </button>
                <button
                    onClick={deleteAllHandler}
                    className={scss.btn_deleteAll}
                >
                    Delete All
                </button>
            </form>
            <br />
            <br />
            <div className={scss.list}>
                {todos?.map((el) => (
                    <div key={el._id}>
                        {editId == el._id ? (
                            <div className={scss.edit_card}>
                                <Image
                                    alt="img"
                                    src={el.file}
                                    width={300}
                                    height={300}
                                    style={{
                                        objectFit: "cover",
                                        borderRadius: "8px",
                                    }}
                                />
                                <form
                                    onSubmit={handleSubmitEdit(onEdit)}
                                    className={scss.edit_form}
                                >
                                    <input
                                        type="text"
                                        placeholder="name"
                                        className={scss.edit_input}
                                        {...registerEdit("name", {
                                            required: true,
                                        })}
                                    />
                                    <input
                                        type="text"
                                        placeholder="age"
                                        className={scss.edit_input}
                                        {...registerEdit("age", {
                                            required: true,
                                        })}
                                    />
                                    <input
                                        type="file"
                                        placeholder="file"
                                        className={scss.edit_input}
                                        {...registerEdit("file", {
                                            required: true,
                                        })}
                                    />
                                    <button
                                        type="submit"
                                        className={scss.update_btn}
                                    >
                                        Save
                                    </button>
                                </form>
                            </div>
                        ) : (
                            <ul className={scss.list}>
                                <li className={scss.card}>
                                    <Image
                                        alt="img"
                                        src={el.file}
                                        width={300}
                                        height={300}
                                        style={{
                                            objectFit: "cover",
                                            borderRadius: "2px",
                                        }}
                                    />
                                    <span>{el.name}</span>
                                    <span>{el.age}</span>
                                    <div className={scss.btns}>
                                        <button
                                            className={scss.card_btn}
                                            onClick={() => {
                                                setEditId(el._id!);
                                                setValue("name", el.name);
                                                setValue("age", el.age);
                                                setValue("file", el.file);
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className={scss.card_btn}
                                            onClick={() =>
                                                deleteHandler(el._id!)
                                            }
                                        >
                                            delete
                                        </button>
                                    </div>
                                </li>
                            </ul>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TodoList;
