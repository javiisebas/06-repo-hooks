import { useEffect, useRef, useState } from "react"

export const useFetch = (url) => {

    // Generea una referencia para hacer un seguimiento. 
    const isMounted = useRef(true) // En el primer render, inMounted=true
    // También para este caso podríamos hacerlo con -> let isMountes = true, pero queremos tener una constante que se maneje propiamente

    const [state, setstate] = useState({
        data: null, loading: true, error: null
    });

    // useEffect se ejecuta en el mount (en el cuerpo) y en el unmount (en el return)
    useEffect(() => {
        // Nada más se renderiza, no queremos hacer nada
        return () => {
            // Una vez se desmonta (lo dejamos de renderizar), queremos alterar la referencia
            isMounted.current = false // Ya no está visible -> Modificamos la referencia de seguimiento
        }
    }, [])

    // Va a cambiar el estado si está montado, si no, no tendrá nada sobre lo que actuar
    useEffect(() => {
        // Reiniciamos los valores iniciales del estado para poder visualizar el loading
        setstate({ data: null, loading: true, error: null })
        fetch(url) // Ejecutamos el fetch cada vez que cambie la url
            .then(resp => resp.json())
            .then(data => {
                // Solo si está visible (Lo sabemos porque tenemos una referencia al propio fragmento)
                // + Tenemos un useEffect sobre el primer render del fragmento. Cuando se desmonte (return)
                // Podemos afecta la refencia para saber que ya no está visible
                if (isMounted.current) { // Solo si está visible ->
                    setstate({
                        data: data,
                        loading: false
                    })
                }
            })
    }, [url]) // Cada vez que cambie la url

    return state

}


