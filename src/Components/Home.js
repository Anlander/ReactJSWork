import React, {Component} from "react";
import {Dropbox} from 'dropbox';
import {Link, Redirect} from "react-router-dom";
import {Helmet} from "react-helmet";

class home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filelist: "",
            entries: [],
            mainpath:"",
            files:'',
            name:"",
            refresh: false
        };
        this.download = this
            .download
            .bind(this);
            this.list = this.list.bind(this);
            this.update = this.update.bind(this)
            this.onSubmit = this.onSubmit.bind(this)
            this.inputRef = React.createRef(null);
            this.link = this.link.bind(this);
            this.getInputValues = this.getInputValues.bind(this);
            this.createfolderv2 = this.createfolderv2.bind(this);
            this.DeleteArg = this.DeleteArg.bind(this);
            this.ikon = this.ikon.bind(this);
            this.onFav = this.onFav.bind(this);



    }
    componentDidMount() {
        const currentPath = this.props.location.pathname.slice(5);
        this.list(currentPath);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.location.pathname !== this.props.location.pathname) {
            const currentPath = this.props.location.pathname.slice(5);
            console.log(currentPath);
            this.list(currentPath);

        }
    }






    ikon(x){
        // console.log(x);
        const accessToken = localStorage.token;
        const dbx = new Dropbox({accessToken, fetch});
        const fileType = /\.(gif|jpg|jpeg|tiff|tif|png|bmp)$/i;
        if(x[".tag"] === "file" && fileType.test(x.name)){
            dbx.filesGetThumbnail({
              entries: [{
                path: '',
                size:''
              }]
            })
            .then((response) =>{
                let test = response

            })
          }
        }



    createfolderv2(e){
        var accessToken = localStorage.token;
        var dbx = new Dropbox({ accessToken, fetch });
        dbx.filesCreateFolderV2({path: "/" + this.state.name})
        .then( (response)=> {
          const currentPath = this.props.location.pathname.slice(5);
          console.log(currentPath);
          this.list(currentPath);


        })
        .catch((error) => {
          console.error(error);
        });

      }
      getInputValues = e => {
          // console.log(e.target.value)
        this.setState({ name: e.target.value });
      }


      DeleteArg = (e)=>{
      let files = this.state.entries
      var accessToken = localStorage.token;
      var dbx = new Dropbox({ accessToken, fetch });
      dbx.filesDeleteV2({path: e})
      .then ((res) =>{
        const currentPath = this.props.location.pathname.slice(5);
        console.log(currentPath);
        this.list(currentPath);

      })

      .catch ((err)=> {
        console.log(err)
      })

      }

    icons(type) {
      const accessToken = localStorage.token;
      const dbx = new Dropbox({accessToken, fetch});
      const fileType = /\.(gif|jpg|jpeg|tiff|tif|png|bmp)$/i;
      if(type[".tag"] === "file" && fileType.test(type.name)){
          dbx.filesGetThumbnail({
            entries: [{
              path: '',
              size:''
            }]
          })
          .then((response) =>{


          })
        }

        else if (type === 'folder') {
          return <i class="fas fa-folder"></i>;
        }
        else if (type === 'file') {
          return <i class="fas fa-file"></i>;
        }
      }


    onSubmit(e) {
        e.preventDefault();
        const file = this.inputRef.current.files[0];
        const newFile = Array.from(file).map(URL.createObjectURL);
        let ACCESS_TOKEN = localStorage.token;
        let dbx = new Dropbox({ accessToken: ACCESS_TOKEN });
        dbx.filesUpload({path: '/' + file.name, contents: file})
          .then((response) => {
            const currentPath = this.props.location.pathname.slice(5);
            this.list(currentPath);
            console.log(response);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    update(newpath){
        this.setState({mainpath:newpath})
        window.location.href = "/home"+newpath
        console.log(this.state.mainpath)
    }
    list(path) {
      let tempResponse;

      //console.log(path)
      //console.log("list")
      //console.log(this.state.mainpath)
      const accessToken = localStorage.token;
      //console.log(accessToken)
      const dbx = new Dropbox({ accessToken, fetch });
      dbx
        .filesListFolder({ path: path })
        .then((response) => {
          let data = JSON.parse(JSON.stringify(response));

          // this.setState({ filelist: data, entries: data.entries });
          //console.log(this.state.filelist)
          //console.log(this.state.entries)
          return data.entries;
        })
        .then((res) => {
          tempResponse = res;
          dbx
            .filesGetThumbnailBatch({
              entries: res
                .filter((file) => file[".tag"] === "file")
                .map((file) => ({
                  path: file.path_lower,
                  size: "w32h32"
                }))
            })
            .then((res) => {
              console.log(res);
              const data = tempResponse.map((file) => {
                if (file[".tag"] !== "folder") {
                  return {
                    ...file,
                    thumbnail: res.entries.filter(
                      (thu) =>
                        thu &&
                        thu[".tag"] === "success" &&
                        thu.metadata.name === file.name
                    )[0]
                  };
                } else {
                  return file;
                }
              });
              this.setState({ entries: data });
              console.log(data);
            });
        });
    }
    download(path) { //this function created bu Filip edited by Hesham
        console.log(path)
        let ACCESS_TOKEN = localStorage.token;
        let dbx = new Dropbox({accessToken: ACCESS_TOKEN});

        dbx
            .filesGetTemporaryLink({path: path})
            .then((response) => {
                console.log(response)
                let data = response
                window.location.href = data.link
            })
            .catch((err) => {
                console.log(err);
            })

    }
    link(x){
        console.log("this is link " +x)
        if(x[".tag"] === "folder"){
            return <Link to={"/home" + x.path_display}>{x.name}</Link>
        }
        else if (x[".tag"] !== "folder"){
            return <Link>{x.name}</Link>
        }
    }
    onFav(x) {
      console.log('ID',x);
      localStorage.setItem('favorite', JSON.stringify(x));
      console.log(localStorage)
    }
    render() {
        let pointerstyle = {
            cursor: "pointer"
        }

        //this.list(this.state.mainpath)
        return (
          <div className="main--home">
            <div className="path-container">
              <h2>Home{this.state.mainpath.path}</h2>
            </div>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Fav</th>
                  <th scope="col">type</th>
                  <th scope="col">FileName</th>
                  <th scope="col">path</th>
                  <th scope="col">size</th>
                  <th scope="col">Download</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {this.state.entries.map((x) => {
                  let thumbnail;
                  if (x[".tag"] === "file") {
                    thumbnail = x.thumbnail
                      ? `data:image/jpeg;base64, ${x.thumbnail.thumbnail}`
                      : `data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3Csvg version='1.1' id='Capa_1' x='0px' y='0px' viewBox='0 0 60 60' style='enable-background:new 0 0 60 60;' xmlns='http://www.w3.org/2000/svg'%3E%3Cg%3E%3Cpath d='M42.5,22h-25c-0.552,0-1,0.447-1,1s0.448,1,1,1h25c0.552,0,1-0.447,1-1S43.052,22,42.5,22z' style='fill: rgb(0, 126, 229);'/%3E%3Cpath d='M17.5,16h10c0.552,0,1-0.447,1-1s-0.448-1-1-1h-10c-0.552,0-1,0.447-1,1S16.948,16,17.5,16z' style='fill: rgb(0, 126, 229);'/%3E%3Cpath d='M42.5,30h-25c-0.552,0-1,0.447-1,1s0.448,1,1,1h25c0.552,0,1-0.447,1-1S43.052,30,42.5,30z' style='fill: rgb(0, 126, 229);'/%3E%3Cpath d='M42.5,38h-25c-0.552,0-1,0.447-1,1s0.448,1,1,1h25c0.552,0,1-0.447,1-1S43.052,38,42.5,38z' style='fill: rgb(0, 126, 229);'/%3E%3Cpath d='M42.5,46h-25c-0.552,0-1,0.447-1,1s0.448,1,1,1h25c0.552,0,1-0.447,1-1S43.052,46,42.5,46z' style='fill: rgb(0, 126, 229);'/%3E%3Cpath d='M38.914,0H6.5v60h47V14.586L38.914,0z M39.5,3.414L50.086,14H39.5V3.414z M8.5,58V2h29v14h14v42H8.5z' style='fill: rgb(0, 126, 229);'/%3E%3C/g%3E%3Cg/%3E%3Cg/%3E%3Cg/%3E%3Cg/%3E%3Cg/%3E%3Cg/%3E%3Cg/%3E%3Cg/%3E%3Cg/%3E%3Cg/%3E%3Cg/%3E%3Cg/%3E%3Cg/%3E%3Cg/%3E%3Cg/%3E%3C/svg%3E`;
                  } else {
                    thumbnail = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' focusable='false' width='40' height='40' viewBox='0 0 40 40' class='mc-icon mc-icon-template-content mc-icon-template-content--folder-small brws-file-name-cell-icon' role='img'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M18.422 11h15.07c.84 0 1.508.669 1.508 1.493v18.014c0 .818-.675 1.493-1.508 1.493H6.508C5.668 32 5 31.331 5 30.507V9.493C5 8.663 5.671 8 6.5 8h7.805c.564 0 1.229.387 1.502.865l1.015 1.777s.4.358 1.6.358z' fill='%2371B9F4'%3E%3C/path%3E%3Cpath d='M18.422 10h15.07c.84 0 1.508.669 1.508 1.493v18.014c0 .818-.675 1.493-1.508 1.493H6.508C5.668 31 5 30.331 5 29.507V8.493C5 7.663 5.671 7 6.5 7h7.805c.564 0 1.229.387 1.502.865l1.015 1.777s.4.358 1.6.358z' fill='%2392CEFF'%3E%3C/path%3E%3C/g%3E%3C/svg%3E`;
                  }
                  return (
                    <tr>
                      <th scope="row">
                        <i style={pointerstyle} onClick={()=>{this.onFav(x)}} className="far fa-star" />
                      </th>
                      <td scope="rownpm " class="portrait"> <img style={{ width: 50 }} alt="icon" src={thumbnail} /> </td>
                      <td>

                        <Link to={"/home" + x.path_display}>{x.name}</Link>
                      </td>
                      <td>{x.path_display}</td>
                      <td>{x.size}</td>
                      <td>
                        <i style={pointerstyle} onClick={()=>{this.download(x.path_display)}} class="fas fa-cloud-download-alt"></i>
                      </td>
                      <button onClick={() => this.DeleteArg(x.path_display)}>
                        Delete
                      </button>
                    </tr>
                  );
                })}
              </tbody>
              <button onClick={this.createfolderv2}>New folder </button>
              <input
                type="text"
                value={this.value}
                onChange={this.getInputValues}
              />
            </table>
            <form onSubmit={this.onSubmit}>
            <input ref={this.inputRef} type="file" multiple/>
            <button type="submit">Upload</button>
            </form>
          </div>
        );
      }
    }


export default home;
