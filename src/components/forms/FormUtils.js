export function validIntegerValue(value){
  const stage = Number(value);
  return (Number.isInteger(stage) && stage > 0) ? 'success' : 'error';
}

export function validStringAttribut(value, minLength){
  return value.length >= minLength ? 'success' : 'error';
}

export function updateImage(event, scope){
  event.preventDefault();

  let reader = new FileReader();
  let file = event.target.files[0];

  reader.readAsDataURL(file);

  reader.onloadend = () => {
    scope.setState({
      file: file,
      image: reader.result
    });
  }
}
