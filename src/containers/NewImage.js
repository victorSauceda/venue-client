import { s3upload } from "./libs/awsLib";

async function handleSubmit(event) {
  event.preventDefault();

  if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
    alert(
      `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE /
        1000000} MB.`
    );
    return;
  }

  setIsLoading(true);

  try {
    const attachment = file.current ? await s3Upload(file.current) : null;

    await createNote({ content, attachment });
    props.history.push("/");
  } catch (e) {
    alert(e);
    setIsLoading(false);
  }
}
