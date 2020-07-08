import React, { Fragment, useEffect, useState } from 'react';
import { PageTitle } from '../../layout-components';
import { Grid, Card, TextField, Button, Typography } from '@material-ui/core';

import { connect } from 'react-redux';
import { addItem } from '../../Store/actions/restaurantAction';
import SimpleReactValidator from 'simple-react-validator';
import UploadImg from './UploadImg.js';
import MaterialTable from 'material-table';
import { storage } from '../../config/firebaseConfig';


const Row = props => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={3}>
        <Typography variant="body2" color="textSecondary">
          {props.label}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        {props.children}
      </Grid>
    </Grid>
  );
};

const ProductForm = props => {
  const [restaurant, setrestaurant] = useState({ name: '...' });

  const [cat, setCat] = useState({ name: '...' });

  useEffect(() => {
    if (props.restaurantState.categories.length > 1) {
      setCat(
        props.restaurantState.categories.find(
          cat => cat.id === props.match.params.catid
        )
      );
      setrestaurant(props.restaurantState.attributes.id);
    }
    // console.log(ccat);
    console.log(props.match.params.catid);
  }, [props.restaurantState.categories]);

  const [values, setValues] = useState({
    variations: [],
    options: [],
    createAt: Date.now()
  });
  const [validator, setValidator] = useState(new SimpleReactValidator({}));

  useEffect(() => {
    console.log(validator);
    validator.purgeFields();
  }, []);

  

 

  useEffect(() => {
    // Update the document title using the browser API
    validator.showMessages();

    // console.log(validator.fieldValid('email'));
    // console.log(validator);
  });

  const handleImage = image => {
    console.log(image);
    setValues({
      ...values,
      image
    });
  };

  const [url, setUrl] = useState('');
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    console.log(`progress ::::::::::::::::::::: ${progress}`)
    if(progress === 100)
              props.history.push('/category/' + cat.id);
  }, [progress]);

  const handleUpload = image => {
    console.log(image)
    console.log(values.image)
    console.log(getStoragePath());
    const path = getStoragePath();
    const uploadTask = storage.ref(`${path}/${image.name}`).put(image);
    uploadTask.on(
      'state_changed',
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      error => {
        console.log(error);
      },
      () => {
        storage
          .ref(path)
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            setUrl(url);
          });
      }
    );
  };

  const handleSubmit = async event => {
    event.preventDefault();
    console.log(validator);
    if (validator.allValid()) {
      values.catid = cat.id;
      await props.addItem({...values})
        
console.log(values.image)
          handleUpload(values.image);
console.log(progress)
    } else {
      validator.showMessages();
      console.log('not valid form');
    }
  };

  const handleChange = event => {
    console.log(event.target);
    setValues({
      ...values,
      [event.target.id]: event.target.value
    });

    console.log(values);
  };

  const getStoragePath = () => {
    if (props.restaurantState.attributes.name) {
      return `${restaurant}/${cat.id}`;
    }
  };

  // console.log(cat);
  // console.log(values);
console.log(progress)
  return (
    <Fragment>
      <PageTitle
        displayPrint="none"
        titleHeading={cat.name}
        titleDescription="Menu item details"
        //        actionClicked={handleSPClick}
        displayBtn={false}
      />
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12}>
          <Card className="p-4 mb-4" displayPrint="block">
            <form onSubmit={handleSubmit}>
              <Grid container spacing={4}>
                <Grid item md={12} md={7}>
                  <TextField
                    fullWidth
                    required
                    autoFocus
                    margin="normal"
                    id="name"
                    label="Item Name"
                    placeholder="Product Name"
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={() => validator.showMessageFor('name')}
                    error={validator.errorMessages.name}
                    helperText={validator.message(
                      'name',
                      values.name,
                      'required',
                      { element: false }
                    )}
                  />

                  <TextField
                    fullWidth
                    required
                    margin="normal"
                    id="introDescription"
                    rows={3}
                    multiline
                    label="Intro Description"
                    placeholder="Short description goes here"
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={() => validator.showMessageFor('introDescription')}
                    error={validator.errorMessages.introDescription}
                    helperText={validator.message(
                      'introDescription',
                      values.introDescription,
                      'required',
                      { element: false }
                    )}
                  />

                  <TextField
                    fullWidth
                    required
                    margin="normal"
                    id="mainDescription"
                    rows={6}
                    multiline
                    label="Main Description"
                    placeholder="Large description goes here"
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={() => validator.showMessageFor('mainDescription')}
                    error={validator.errorMessages.mainDescription}
                    helperText={validator.message(
                      'mainDescription',
                      values.mainDescription,
                      'string',
                      { element: false }
                    )}
                  />

                  {/* <Typography variant="h6" gutterBottom>
        Variation Price
      </Typography>
      <Grid container spacing={4}>
              <Grid item xs={6} >
                Price
                </Grid>
                <Grid item xs={6} >
                  Feature
                </Grid>
    </Grid> */}

                  <MaterialTable
                    title="Variation Prices"
                    style={{
                      boxShadow: 'none',
                      borderRadius: '0.5rem',
                      border: '1px solid lightgray',
                      marginTop: '20px'
                    }}
                    localization={{
                      header: {
                        actions: ' '
                      },
                      body: { emptyDataSourceMessage: ' ' }
                    }}
                    options={{
                      search: false,
                      actionsColumnIndex: -1,
                      paging: false,
                      sorting: false
                    }}
                    columns={[
                      { title: 'Price', field: 'price' },
                      { title: 'Feature', field: 'feature' }
                    ]}
                    data={values.variations}
                    editable={{
                      onRowAdd: newData =>
                        new Promise(resolve => {
                          setTimeout(() => {
                            resolve();
                            const variations = [...values.variations];
                            variations.push(newData);
                            setValues({ ...values, variations });
                          }, 200);
                        }),
                      onRowUpdate: (newData, oldData) =>
                        new Promise(resolve => {
                          setTimeout(() => {
                            resolve();
                            const variations = [...values.variations];
                            variations[variations.indexOf(oldData)] = newData;
                            setValues({ ...values, variations });
                          }, 200);
                        }),
                      onRowDelete: oldData =>
                        new Promise(resolve => {
                          setTimeout(() => {
                            resolve();
                            const variations = [...values.variations];
                            variations.splice(variations.indexOf(oldData), 1);
                            setValues({ ...values, variations });
                          }, 600);
                        })
                    }}
                  />

                  <MaterialTable
                    title="Item Options"
                    style={{
                      boxShadow: 'none',
                      borderRadius: '0.5rem',
                      border: '1px solid lightgray',
                      marginTop: '20px'
                    }}
                    localization={{
                      header: {
                        actions: ' '
                      },
                      body: { emptyDataSourceMessage: ' ' }
                    }}
                    options={{
                      search: false,
                      actionsColumnIndex: -1,
                      paging: false,
                      sorting: false
                    }}
                    columns={[{ title: 'name', field: 'option' }]}
                    data={values.options}
                    editable={{
                      onRowAdd: newData =>
                        new Promise(resolve => {
                          setTimeout(() => {
                            resolve();
                            const options = [...values.options];
                            options.push(newData);
                            setValues({ ...values, options });
                          }, 200);
                        }),
                      onRowUpdate: (newData, oldData) =>
                        new Promise(resolve => {
                          setTimeout(() => {
                            resolve();
                            const options = [...values.options];
                            options[options.indexOf(oldData)] = newData;
                            setValues({ ...values, options });
                          }, 200);
                        }),
                      onRowDelete: oldData =>
                        new Promise(resolve => {
                          setTimeout(() => {
                            resolve();
                            const options = [...values.options];
                            options.splice(options.indexOf(oldData), 1);
                            setValues({ ...values, options });
                          }, 600);
                        })
                    }}
                    detailPanel={rowData => {
                      return (
                        <div style={{ backgroundColor: '#f4f5f4' }}>
                          <MaterialTable
                            title=" "
                            columns={[
                              { title: 'Option', field: 'option' },
                              { title: 'Price', field: 'price' }
                            ]}
                            style={{
                              boxShadow: 'none',
                              borderRadius: '0.5rem',
                              border: 'none',
                              //marginTop: '-10px',
                              backgroundColor: '#f4f5f4'
                            }}
                            localization={{
                              header: {
                                actions: ' '
                              },
                              body: { emptyDataSourceMessage: ' ' }
                            }}
                            data={rowData.detail}
                            options={{
                              search: false,
                              actionsColumnIndex: -1,
                              paging: false,
                              sorting: false,
                              headerStyle: {
                                backgroundColor: '#f4f5f4'
                                //color: '#FFF'
                              }
                            }}
                            editable={{
                              onRowAdd: newData =>
                                new Promise(resolve => {
                                  console.log(rowData);
                                  setTimeout(() => {
                                    resolve();
                                    const detail = rowData.detail
                                      ? [...rowData.detail]
                                      : [];

                                    detail.push(newData);
                                    const options = values.options;
                                    options[
                                      rowData.tableData.id
                                    ].detail = detail;
                                    console.log(options[rowData.tableData.id]);
                                    setValues({
                                      ...values,
                                      options
                                    });
                                  }, 200);
                                }),
                              onRowUpdate: (newData, oldData) =>
                                new Promise(resolve => {
                                  setTimeout(() => {
                                    resolve();
                                    const detail = rowData.detail
                                      ? [...rowData.detail]
                                      : [];

                                    detail[detail.indexOf(oldData)] = newData;

                                    const options = values.options;
                                    options[
                                      rowData.tableData.id
                                    ].detail = detail;

                                    setValues({
                                      ...values,
                                      options
                                    });
                                  }, 200);
                                }),
                              onRowDelete: oldData =>
                                new Promise(resolve => {
                                  setTimeout(() => {
                                    resolve();
                                    const detail = rowData.detail
                                      ? [...rowData.detail]
                                      : [];
                                    detail.splice(detail.indexOf(oldData), 1);
                                    const options = values.options;
                                    options[
                                      rowData.tableData.id
                                    ].detail = detail;

                                    setValues({
                                      ...values,
                                      options
                                    });
                                  }, 200);
                                })
                            }}
                          />
                        </div>
                      );
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={5}>
                  <UploadImg
                    getStoragePath={getStoragePath}
                    handleImage={handleImage}
                    progress={progress}
                  />
                </Grid>
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className="mt-4">
                Save
              </Button>
            </form>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  ...state
});
const mapDispatchToProps = dispatch => ({
  addItem: values => dispatch(addItem(values))
  // clearErrors: () => dispatch(clearErrors())
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm);
