import React, { useContext } from "react";
import { FilterTaskContext } from "./Task";
import ListTask from "./ListTask";

const FilterTask = () => {
    const filteredTaskList = useContext(FilterTaskContext);
    console.log(filteredTaskList);

    if (!filteredTaskList || filteredTaskList.length === 0) {
        return <h1>No tasks found...</h1>
    }
    return (
        <>
            {
                filteredTaskList.map((t, index) => {
                    return <>
                        <ListTask
                            id={t.id}
                            key={index}
                            title={t.title}
                            body={t.body} />
                        <button type="button" onClick={() => {
                            navigate('/');
                        }}>Back</button>
                    </>
                })
            }
        </>
    )
}

export default FilterTask;
