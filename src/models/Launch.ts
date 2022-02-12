interface Launch {
  id: number,
  name: string,
  pad: Pad,
  status: Status
}

interface Pad {
  latitude: string,
  longitude: string
}

interface Status {
  id: number
}

export default Launch;