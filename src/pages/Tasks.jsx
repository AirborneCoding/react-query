import React from "react";
import Form from "../components/Form";
import { useFetchTasks } from "../hooks/Tasks";
import SingleItem from "../components/SingleItem";

const Tasks = () => {
    const { isLoading, isError, data } = useFetchTasks();

    if (isLoading) {
        return <p style={{ marginTop: '1rem ' }}>Loading...</p>;
    }
    if (isError) {
        return <p style={{ marginTop: '1rem ' }}>There was an error...</p>;
    }

    return <main className="body-container">
        <Form />
        <h3 className="text-xl">
            Tasks :
        </h3>
        <section className='items'>
            {data.taskList.map((item) => {
                return <SingleItem key={item.id} item={item} />;
            })}
        </section>

    </main>;
};

export default Tasks;
