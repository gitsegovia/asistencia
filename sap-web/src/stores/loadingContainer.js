import { createContainer } from "unstated-next"
import React, {useState} from 'react';

function useLoading() {
    let [loading, setLoading] = useState(false)
    let start = () => setLoading(true)
    let stop = () => setLoading(false)
    return { loading, start, stop, setLoading }
  }
  
  let Loading = createContainer(useLoading)

  export default Loading