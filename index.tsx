function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [file, setFile] = useState<File | null>();

  const submit = () => {
    console.log(name, age);

    console.log(file);

    var fd = new FormData();
    fd.append("name", name);
    fd.append("age", age.toString());
    fd.append("file", file as Blob);

    $.ajax({
      type: "POST",
      url: "www.happy.com",
      data: fd,
      processData: false, //重要
      contentType: "multipart/form-data", //重要
      success: function (data: any) {},
    });
  };
  return (
    <div className="App">
      <form action="form_action.asp" method="get">
        <p>
          name:{" "}
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
        </p>
        <p>
          age:{" "}
          <input
            type="number"
            name="age"
            value={age}
            onChange={(e) => setAge(Number(e.currentTarget.value))}
          />
        </p>
        <p>
          file:
          <input
            type="file"
            name="file"
            onChange={(e) => setFile(e.target.files && e.target.files[0])}
          />
        </p>
        <input
          type="button"
          name="b1"
          value="submit"
          onClick={() => submit()}
        />
      </form>
    </div>
  );
}
