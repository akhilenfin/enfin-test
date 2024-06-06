import { useEffect, useState } from "react";

function Maths() {
  const [count, setCount] = useState(0);

  const [operations, setOperations] = useState(["add", "sub", "mul"]);

  useEffect(() => {
    let op = [...operations];
    op.push('sub');
    setOperations(op);
  }, [count]);

  return (
    <div>
      Maths - {count}
      <br />
      <button onClick={setCount(count++)}>Click</button>
      <ul>
        {operations.map((item) => {
          return <li>{item}</li>;
        })}
      </ul>
    </div>
  );
}
