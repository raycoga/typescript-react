import React, { useState, useRef } from "react";

type ReactForm = React.FormEvent<HTMLFormElement>;
type inputForm = HTMLInputElement;

interface ObjTask {
  name: string|undefined;
  done: boolean;
}

const initialStateTask: string|undefined=undefined // union property

function App(): JSX.Element {
  const [newTask, setnewTask] = useState(initialStateTask);
  const [taskList, settaskList] = useState<ObjTask[]>([]);
  const inputForm = useRef<inputForm>(null);

  const handleSubmit = (e: ReactForm): void => {
    e.preventDefault();
    addNewTask(newTask);
    setnewTask("");
    inputForm.current?.focus()
  };

  const addNewTask = (name: string|undefined): void => {
    let tasks: ObjTask[] = [...taskList];
    tasks.unshift({
      name,
      done: false,
    });
    settaskList(tasks);
  };

  const markTask = (i: number): void => {
    let tasks: ObjTask[] = [...taskList];
    tasks[i].done = !tasks[i].done;
    settaskList(tasks);
  };
  const removeTask = (i: number): void => {
    let tasks: ObjTask[] = [...taskList];
    tasks.splice(i, 1);
    settaskList(tasks);
  };

  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1 style={{textAlign:'center'}}>TO-DO CON TYPESCRIPT</h1>
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <input
                  className="form-control"
                  type="text"
                  value={newTask}
                  onChange={(e) => setnewTask(e.target.value)}
                  autoFocus
                  ref={inputForm}
                />
                <button className="btn btn-success btn-block mt-2">
                  accept
                </button>
              </form>
            </div>
          </div>
          {taskList.map((e: ObjTask, key: number) => (
            <div className="card card-body mt-2" key={key}>
              <h2 style={{ textDecoration: e.done ? "line-through" : "" }}>
                {e.name}
              </h2>
              <div>
                <button
                  className={`btn ${e.done?'btn-success':'btn-secondary'}`}
                  onClick={(_) => markTask(key)}
                >
                  {e.done ? "✓" : "✗"}
                </button>

                <button className="btn" onClick={(_) => removeTask(key)}>
                  🗑
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
