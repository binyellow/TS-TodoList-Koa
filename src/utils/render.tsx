function renderTimeStamp(time: number) {
  return new Date(time).toLocaleString();
}

export { renderTimeStamp }