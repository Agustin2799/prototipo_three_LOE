// En general, pasar referencias de hijo a padre no es una práctica recomendada a menos que tengas una razón muy específica y justificada para hacerlo. 

// Las referencias sirven para acceder directamente a elementos del dom
const Hijo = ({ setRef }) => {
  const localRef = useRef();

  useEffect(() => {
    setRef(localRef); // Comunicar la referencia al padre
  }, []);

  return <div ref={localRef}>Soy el hijo</div>;
};

const Padre = () => {
  const refHijo = useRef();

  const handleSetRef = (ref) => {
    refHijo.current = ref.current; // Guardar la referencia que viene del hijo
  };

  return <Hijo setRef={handleSetRef} />;
};
