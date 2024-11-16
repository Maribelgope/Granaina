const StatusText = ({ status }) => {
  return (
    <>{status == 0 ? "Pendiente" : status == 1 ? "En proceso" : "Completado"}</>
  );
};

export default StatusText;
