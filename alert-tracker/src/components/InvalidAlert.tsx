import React, { useRef, useState, useEffect} from 'react';

const InvalidAlert: React.FC<{alertId: string; deleteAlert: Function, errorAt: string}> = ({alertId, deleteAlert, errorAt}) => {
  const intervalRef = useRef<NodeJS.Timeout>();
  const [count, setCount] = useState(5)

  useEffect(() => {
    intervalRef.current = setInterval(
      () => {
        setCount((count) => count - 1);
        if (count <= 1) {
          deleteAlert(alertId);
        }
      },
      1000
    )

    return () => {
      clearInterval(intervalRef.current as NodeJS.Timeout)
    }
  }, [alertId, count, deleteAlert])

  return (
    <div style={{
      display: "flex", 
      width: '300px',
      backgroundColor: "#FAFAFA",
      justifyContent: "space-between", 
      alignItems: "center", 
      padding: 10,
      borderBottomStyle: "solid",
      borderWidth: "1px",
      borderColor: "black",
    }}>
      <p>{errorAt}</p>
      <p>{count}</p>
    </div>
  )
}

export default InvalidAlert;