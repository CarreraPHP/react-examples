import React, { Suspense, useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

type TodoWithUser = Pick<Todo, "completed" | "id" | "title"> & { user: User };

const clientLoader = async () => {
  const todoUsers = await fetch("https://jsonplaceholder.typicode.com/users");
  const users: User[] = await todoUsers.json();
  const todoResponse = await fetch(
    "https://jsonplaceholder.typicode.com/todos"
  );
  const data: Todo[] = await todoResponse.json();

  const todo = data.map((item) => {
    const { userId, ...rest } = item;
    const filteredUser = users.filter((user) => user.id === userId);

    return {
      ...rest,
      user: filteredUser.length > 0 ? filteredUser[0] : {},
    } as TodoWithUser;
  });
  return todo as TodoWithUser[];
};

const TodoList = () => {
  const [list, setList] = useState<TodoWithUser[]>([]);
  const [filterValue, setFilterValue] = useState<string>("");
  const [filterCompleted, setFilterCompleted] = useState<string>("ALL");

  useEffect(() => {
    const dataLoader = async () => setList(await clientLoader());
    dataLoader();
  }, []);
  return (
    <div>
      <form>
        <label>
          Filter:
          <input
            type="text"
            name="filter-value"
            defaultValue={filterValue}
            onChange={(e) => {
              setFilterValue(e.target.value);
            }}
          />
          <select
            name="filter-completed"
            defaultValue={filterValue}
            onChange={(e) => {
              setFilterCompleted(e.target.value);
            }}
          >
            <option value={"ALL"}>All</option>
            <option value={"COMPLETED"}>Completed</option>
            <option value={"INCOMPLETE"}>InComplete</option>
          </select>
        </label>
      </form>
      <Suspense fallback="loading....">
        {list
          .filter((item) => {
            let selected;
            if (filterCompleted === "COMPLETED") {
              selected = item.completed === true;
            } else if (filterCompleted === "INCOMPLETE") {
              selected = item.completed === false;
            } else {
              selected = true;
            }

            return (
              selected &&
              (item.title.includes(filterValue) ||
                item.user.name.includes(filterValue))
            );
          })
          .map((item) => {
            return (
              <React.Fragment key={`${item.id}-${item.title}`}>
                {/* <pre key={i}>{JSON.stringify(item, null, 4)}</pre> */}
                <div className="todo-item">
                  <input
                    type="checkbox"
                    onClick={() => {
                      setList((ps) => {
                        return ps.map((selectedItem) => {
                          return selectedItem.id === item.id
                            ? {
                                ...selectedItem,
                                completed: !selectedItem.completed,
                              }
                            : selectedItem;
                        });
                      });
                    }}
                    defaultChecked={item.completed}
                  />
                  <span
                    className="todo-title"
                    style={{
                      textDecoration: item.completed ? "line-through" : "none",
                      color: item.completed ? "#888" : "inherit",
                    }}
                  >
                    {item.title}
                  </span>
                  <span>{item.user.name}</span>
                </div>
              </React.Fragment>
            );
          })}
      </Suspense>
    </div>
  );
};

export default TodoList;

/**
 * {
    "id": 1,
    "title": "delectus aut autem",
    "completed": false,
    "user": {
        "id": 1,
        "name": "Leanne Graham",
        "username": "Bret",
        "email": "Sincere@april.biz",
        "address": {
            "street": "Kulas Light",
            "suite": "Apt. 556",
            "city": "Gwenborough",
            "zipcode": "92998-3874",
            "geo": {
                "lat": "-37.3159",
                "lng": "81.1496"
            }
        },
        "phone": "1-770-736-8031 x56442",
        "website": "hildegard.org",
        "company": {
            "name": "Romaguera-Crona",
            "catchPhrase": "Multi-layered client-server neural-net",
            "bs": "harness real-time e-markets"
        }
    }
}
 */
