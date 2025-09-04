import {Alert} from 'react-native';
import qs from 'qs';
import RNFetchBlob from 'rn-fetch-blob';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {accessToken, languagee} from '../../shared/Constant/Constant';
import {setWishlist} from '../../redux/action/setWishList';
//var base_url = 'https://staging.nowbuysell.com/api/'; //// Base url  staging
var base_url = 'https://portal.nowbuysell.com/api/';
///https://portal.nowbuysell.com/api/

let header = {
  Authorization: 'Token  a82a8fc4a1a4af42751b310441e26dd6c4a91895', // Get token from GMS Authentication api hardcoded
  'Cache-Control': 'no-cache',
  'Content-Type': 'application/json',
};

// var acesstoken = '';
// const getData = async () => {
//   console.log('call get data');
//   try {
//     const value = await AsyncStorage.getItem('UserDataLogin');
//     const token = await JSON.parse(value);
//     acesstoken = token.access_token;
//     if (token !== null) {
//       acesstoken = token.access_token;
//       console.log('accesstokenn12345' + acesstoken);
//       console.log(acesstoken);
//     } else {
//       console.log('null access token');
//     }
//   } catch (e) {
//     console.log(e + ' oama');
//     alert('error');

//   }
// };
//getData();

export var signUp = data => {
  let url = base_url + 'v1/signup?lang=' + languagee;
  return new Promise(function (resolve, reject) {
    try {
      body = JSON.stringify(data);
      let requestConfig = {
        method: 'POST',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
        },
        body: body,
      };
      fetch(url, requestConfig)
        .then(r => {
          //console.log('SuccessfullResult=>', r);
          r.json()
            .then(res => {
              resolve(res);
            })
            .catch(e => {
              console.log('Incorrect JSON');
            });
        })
        .catch(e => {
          reject(e);
        });
    } catch (e) {
      console.log(e);
    }
  });
};

export var signIn = data => {
  let url = base_url + 'security/token?lang=' + languagee;
  return new Promise(function (resolve, reject) {
    try {
      //   let body = {
      //     account:
      //       'https://gsmtasks.com/api/tasks/accounts/3380cd67-40b2-4ccf-8321-5f58a2b8f4d0/', // hardcoded
      //     category: 'drop_off', // hardcoded
      //     address: address,
      //   };

      body = qs.stringify(data);
      let requestConfig = {
        method: 'POST',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body,
      };
      fetch(url, requestConfig)
        .then(r => {
          //console.log('SuccessfullResult=>', r);
          r.json()
            .then(res => {
              resolve(res);
            })
            .catch(e => {
              console.log('Incorrect JSON');
            });
        })
        .catch(e => {
          reject(e);
        });
    } catch (e) {
      console.log(e);
    }
  });
};

export var forgotPassword = data => {
  let url = base_url + 'v1/forgotpassword?lang=' + languagee;
  return new Promise(function (resolve, reject) {
    try {
      //   let body = {
      //     account:
      //       'https://gsmtasks.com/api/tasks/accounts/3380cd67-40b2-4ccf-8321-5f58a2b8f4d0/', // hardcoded
      //     category: 'drop_off', // hardcoded
      //     address: address,
      //   };

      body = JSON.stringify(data);
      let requestConfig = {
        method: 'POST',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
        },
        body: body,
      };
      fetch(url, requestConfig)
        .then(r => {
          //console.log('SuccessfullResult=>', r);
          r.json()
            .then(res => {
              resolve(res);
            })
            .catch(e => {
              console.log('Incorrect JSON');
            });
        })
        .catch(e => {
          reject(e);
        });
    } catch (e) {
      console.log(e);
    }
  });
};

export var signIncontact = data => {
  let url = base_url + 'v1/customer/contact?lang=' + languagee;
  return new Promise(function (resolve, reject) {
    try {
      //   let body = {
      //     account:
      //       'https://gsmtasks.com/api/tasks/accounts/3380cd67-40b2-4ccf-8321-5f58a2b8f4d0/', // hardcoded
      //     category: 'drop_off', // hardcoded
      //     address: address,
      //   };

      body = JSON.stringify(data);
      let requestConfig = {
        method: 'POST',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
        },
        body: body,
      };
      fetch(url, requestConfig)
        .then(r => {
          //console.log('SuccessfullResult=>', r);
          r.json()
            .then(res => {
              resolve(res);
            })
            .catch(e => {
              console.log('Incorrect JSON');
            });
        })
        .catch(e => {
          reject(e);
        });
    } catch (e) {
      console.log(e);
    }
  });
};

export var verifyOtp = data => {
  let url = base_url + 'v1/otpverification?lang=' + languagee;
  return new Promise(function (resolve, reject) {
    try {
      body = JSON.stringify(data);
      console.log(body);
      let requestConfig = {
        method: 'POST',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
        },
        body: body,
      };
      fetch(url, requestConfig)
        .then(r => {
          //console.log('SuccessfullResult=>', r);
          r.json()
            .then(res => {
              resolve(res);
            })
            .catch(e => {
              console.log('Incorrect JSON');
            });
        })
        .catch(e => {
          reject(e);
        });
    } catch (e) {
      console.log(e);
    }
  });
};

export var ResendOtp = number => {
  let url = base_url + 'v1/resendotp/' + number + '?lang=' + languagee;
  console.log(url);
  return new Promise(function (resolve, reject) {
    try {
      // body = JSON.stringify(data);
      let requestConfig = {
        method: 'POST',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
        },
        body: {},
      };
      fetch(url, requestConfig)
        .then(r => {
          //console.log('SuccessfullResult=>', r);
          r.json()
            .then(res => {
              resolve(res);
            })
            .catch(e => {
              console.log('Incorrect JSON');
            });
        })
        .catch(e => {
          reject(e);
        });
    } catch (e) {
      console.log(e);
    }
  });
};

export var FilterAllfaeturedMotors = data => {
  let url = base_url + 'v1/car/filter/' + languagee + '/get';

  return new Promise(function (resolve, reject) {
    try {
      body = JSON.stringify(data);
      // alert(body);
      console.log(body);
      let requestConfig = {
        method: 'POST',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: body,
      };
      fetch(url, requestConfig)
        .then(r => {
          //console.log('SuccessfullResult=>', r);
          r.json()
            .then(res => {
              //console.log(res);
              resolve(res);
              //setWishlist(res);
            })
            .catch(e => {
              console.log('123');
              console.log('Incorrect JSON');
            });
        })
        .catch(e => {
          reject(e);
        });
    } catch (e) {
      console.log(e);
    }
  });
};

export var FilterAllfaeturedProperty = data => {
  let url = base_url + 'v1/property/filter/' + languagee + '/get';

  return new Promise(function (resolve, reject) {
    try {
      body = JSON.stringify(data);
      let requestConfig = {
        method: 'POST',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: body,
      };
      fetch(url, requestConfig)
        .then(r => {
          //console.log('SuccessfullResult=>', r);
          r.json()
            .then(res => {
              resolve(res);
            })
            .catch(e => {
              console.log('Incorrect JSON');
            });
        })
        .catch(e => {
          reject(e);
        });
    } catch (e) {
      console.log(e);
    }
  });
};

export var Getbanners = () => {
  let url = base_url + `v1/${languagee}/Mobile/banners`;
  return new Promise(function (resolve, reject) {
    try {
      //body = JSON.stringify(data);
      let requestConfig = {
        method: 'GET',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        //body: body,
      };
      fetch(url, requestConfig)
        .then(r => {
          //console.log('SuccessfullResult=>', r);
          r.json()
            .then(res => {
              resolve(res);
            })
            .catch(e => {
              console.log('Incorrect JSON');
            });
        })
        .catch(e => {
          reject(e);
        });
    } catch (e) {
      console.log(e);
    }
  });
};

export var GetAllBlogs = (pgno, pagesize) => {
  let url =
    base_url + `v1/${languagee}/newsfeed/?pgno=${pgno}&pagesize=${pagesize}`;
  return new Promise(function (resolve, reject) {
    try {
      //body = JSON.stringify(data);
      let requestConfig = {
        method: 'GET',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        //body: body,
      };
      fetch(url, requestConfig)
        .then(r => {
          //console.log('SuccessfullResult=>', r);
          r.json()
            .then(res => {
              resolve(res);
            })
            .catch(e => {
              console.log('blogs');
              console.log('Incorrect JSON');
            });
        })
        .catch(e => {
          reject(e);
        });
    } catch (e) {
      console.log(e);
    }
  });
};

export var propertyDeatils = id => {
  let url = base_url + `v1/property/getByID/${languagee}/${id}`;
  return new Promise(function (resolve, reject) {
    try {
      //body = JSON.stringify(data);
      let requestConfig = {
        method: 'GET',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        //body: body,
      };
      fetch(url, requestConfig)
        .then(r => {
          //console.log('SuccessfullResult=>', r);
          r.json()
            .then(res => {
              resolve(res);
            })
            .catch(e => {
              console.log('Incorrect JSON');
            });
        })
        .catch(e => {
          reject(e);
        });
    } catch (e) {
      console.log(e);
    }
  });
};

export var carDeatils = id => {
  let url = base_url + `v1/car/getByID/${languagee}/${id}`;
  return new Promise(function (resolve, reject) {
    try {
      //body = JSON.stringify(data);
      let requestConfig = {
        method: 'GET',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        //body: body,
      };
      fetch(url, requestConfig)
        .then(r => {
          //console.log('SuccessfullResult=>', r);
          r.json()
            .then(res => {
              resolve(res);
            })
            .catch(e => {
              console.log('Incorrect JSON');
            });
        })
        .catch(e => {
          reject(e);
        });
    } catch (e) {
      console.log(e);
    }
  });
};

export var alertNotifications = pgNo => {
  let url = base_url + `v1/${languagee}/notifications?pg=${pgNo}`;
  //alert(accessToken + 'token');
  console.log(accessToken);
  return new Promise(function (resolve, reject) {
    try {
      //body = JSON.stringify(data);
      let requestConfig = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        //body: body,
      };
      fetch(url, requestConfig)
        .then(r => {
          //console.log('SuccessfullResult=>', r);
          r.json()
            .then(res => {
              resolve(res);
            })
            .catch(e => {
              console.log('Incorrect JSON');
            });
        })
        .catch(e => {
          reject(e);
        });
    } catch (e) {
      console.log(e);
    }
  });
};

export var getAllCities = () => {
  let url = base_url + `v1/${languagee}/cities`;
  return new Promise(function (resolve, reject) {
    try {
      //body = JSON.stringify(data);
      let requestConfig = {
        method: 'GET',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        //body: body,
      };
      fetch(url, requestConfig)
        .then(r => {
          //console.log('SuccessfullResult=>', r);
          r.json()
            .then(res => {
              resolve(res);
            })
            .catch(e => {
              console.log('Incorrect JSON');
            });
        })
        .catch(e => {
          reject(e);
        });
    } catch (e) {
      console.log(e);
    }
  });
};

export var getAllCountries = () => {
  let url = base_url + `v1/${languagee}/countries`;
  return new Promise(function (resolve, reject) {
    try {
      //body = JSON.stringify(data);
      let requestConfig = {
        method: 'GET',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        //body: body,
      };
      fetch(url, requestConfig)
        .then(r => {
          //console.log('SuccessfullResult=>', r);
          r.json()
            .then(res => {
              resolve(res);
            })
            .catch(e => {
              console.log('Incorrect JSON');
            });
        })
        .catch(e => {
          reject(e);
        });
    } catch (e) {
      console.log(e);
    }
  });
};

export var getAllCarModels = () => {
  let url = base_url + `v1/${languagee}/model`;
  return new Promise(function (resolve, reject) {
    try {
      //body = JSON.stringify(data);
      let requestConfig = {
        method: 'GET',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        //body: body,
      };
      fetch(url, requestConfig)
        .then(r => {
          //console.log('SuccessfullResult=>', r);
          r.json()
            .then(res => {
              resolve(res);
            })
            .catch(e => {
              console.log('Incorrect JSON');
            });
        })
        .catch(e => {
          reject(e);
        });
    } catch (e) {
      console.log(e);
    }
  });
};

export var getAllCarMakes = () => {
  let url = base_url + `v1/${languagee}/makes`;
  return new Promise(function (resolve, reject) {
    try {
      //body = JSON.stringify(data);
      let requestConfig = {
        method: 'GET',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        //body: body,
      };
      fetch(url, requestConfig)
        .then(r => {
          //console.log('SuccessfullResult=>', r);
          r.json()
            .then(res => {
              resolve(res);
            })
            .catch(e => {
              console.log('Incorrect JSON');
            });
        })
        .catch(e => {
          reject(e);
        });
    } catch (e) {
      console.log(e);
    }
  });
};

export var trendingProperty = data => {
  let url = base_url + 'v1/property/Trending/' + languagee + '/get';
  return new Promise(function (resolve, reject) {
    try {
      body = JSON.stringify(data);
      let requestConfig = {
        method: 'POST',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: body,
      };
      fetch(url, requestConfig)
        .then(r => {
          //console.log('SuccessfullResult=>', r);
          r.json()
            .then(res => {
              resolve(res);
            })
            .catch(e => {
              console.log('Incorrect JSON');
            });
        })
        .catch(e => {
          reject(e);
        });
    } catch (e) {
      console.log(e);
    }
  });
};

export var trendingCar = data => {
  let url = base_url + 'v1/car/Trending/' + languagee + '/get';
  return new Promise(function (resolve, reject) {
    try {
      body = JSON.stringify(data);
      let requestConfig = {
        method: 'POST',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: body,
      };
      fetch(url, requestConfig)
        .then(r => {
          //console.log('SuccessfullResult=>', r);
          r.json()
            .then(res => {
              resolve(res);
            })
            .catch(e => {
              console.log('Incorrect JSON');
            });
        })
        .catch(e => {
          reject(e);
        });
    } catch (e) {
      console.log(e);
    }
  });
};

export var addWishList = data => {
  let url = base_url + 'v1/wishlist?lang=' + languagee;
  return new Promise(function (resolve, reject) {
    try {
      body = JSON.stringify(data);
      let requestConfig = {
        method: 'POST',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: body,
      };
      fetch(url, requestConfig)
        .then(r => {
          //console.log('SuccessfullResult=>', r);
          r.json()
            .then(res => {
              resolve(res);
            })
            .catch(e => {
              console.log('Incorrect JSON');
            });
        })
        .catch(e => {
          reject(e);
        });
    } catch (e) {
      console.log(e);
    }
  });
};

export var deleteWishList = data => {
  let url = base_url + 'v1/Deletewishlist?lang=' + languagee;
  return new Promise(function (resolve, reject) {
    try {
      body = JSON.stringify(data);
      let requestConfig = {
        method: 'DELETE',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: body,
      };
      fetch(url, requestConfig)
        .then(r => {
          //console.log('SuccessfullResult=>', r);
          r.json()
            .then(res => {
              resolve(res);
            })
            .catch(e => {
              console.log('Incorrect JSON');
            });
        })
        .catch(e => {
          reject(e);
        });
    } catch (e) {
      console.log(e);
    }
  });
};

export var FeeddBlogDeatils = id => {
  let url = base_url + `v1/${languagee}/newsfeedByID/${id}`;
  return new Promise(function (resolve, reject) {
    try {
      //body = JSON.stringify(data);
      let requestConfig = {
        method: 'GET',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        //body: body,
      };
      fetch(url, requestConfig)
        .then(r => {
          //console.log('SuccessfullResult=>', r);
          r.json()
            .then(res => {
              resolve(res);
            })
            .catch(e => {
              console.log('Incorrect JSON');
            });
        })
        .catch(e => {
          reject(e);
        });
    } catch (e) {
      console.log(e);
    }
  });
};

export var getPropertyCategories = () => {
  let url = base_url + `v1/property/filter/${languagee}/categories`;
  return new Promise(function (resolve, reject) {
    try {
      //body = JSON.stringify(data);
      let requestConfig = {
        method: 'GET',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        //body: body,
      };
      fetch(url, requestConfig)
        .then(r => {
          //console.log('SuccessfullResult=>', r);
          r.json()
            .then(res => {
              if (res.status === true) {
                const notifications = res.data;
                for (const key in notifications) {
                  notifications[key]['isSelected'] = 'false';
                }
                // console.log(JSON.stringify(notifications) + 'ddddddd');
                resolve(notifications);
              } else {
                console.log('Incorrect JSON');
              }

              //resolve(res);
            })
            .catch(e => {
              console.log('Incorrect JSON');
            });
        })
        .catch(e => {
          reject(e);
        });
    } catch (e) {
      console.log(e);
    }
  });
};

export var getCarCategories = () => {
  let url = base_url + `v1/car/filter/${languagee}/categories`;
  return new Promise(function (resolve, reject) {
    try {
      //body = JSON.stringify(data);
      let requestConfig = {
        method: 'GET',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        //body: body,
      };
      fetch(url, requestConfig)
        .then(r => {
          //console.log('SuccessfullResult=>', r);
          r.json()
            .then(res => {
              //resolve(res);
              if (res.status === true) {
                const notifications = res.data;
                for (const key in notifications) {
                  notifications[key]['isSelected'] = 'false';
                }
                //console.log(JSON.stringify(notifications) + 'ddddddd');
                resolve(notifications);
              } else {
                console.log('Incorrect JSON');
              }
            })
            .catch(e => {
              console.log('Incorrect JSON');
            });
        })
        .catch(e => {
          reject(e);
        });
    } catch (e) {
      console.log(e);
    }
  });
};

export var getPropertyFeature = () => {
  let url = base_url + `v1/property/filter/${languagee}/features`;
  return new Promise(function (resolve, reject) {
    try {
      //body = JSON.stringify(data);
      let requestConfig = {
        method: 'GET',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        //body: body,
      };
      fetch(url, requestConfig)
        .then(r => {
          //console.log('SuccessfullResult=>', r);
          r.json()
            .then(res => {
              if (res.status === true) {
                const notifications = res.data;
                for (const key in notifications) {
                  notifications[key]['isSelected'] = 'false';
                }
                //console.log(JSON.stringify(notifications) + 'ddddddd');
                resolve(notifications);
              } else {
                console.log('Incorrect JSON');
              }
            })
            .catch(e => {
              console.log('Incorrect JSON');
            });
        })
        .catch(e => {
          reject(e);
        });
    } catch (e) {
      console.log(e);
    }
  });
};

export var getCarFeature = () => {
  let url = base_url + `v1/car/filter/${languagee}/features`;
  return new Promise(function (resolve, reject) {
    try {
      //body = JSON.stringify(data);
      let requestConfig = {
        method: 'GET',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        //body: body,
      };
      fetch(url, requestConfig)
        .then(r => {
          //console.log('SuccessfullResult=>', r);
          r.json()
            .then(res => {
              if (res.status === true) {
                const notifications = res.data;
                for (const key in notifications) {
                  notifications[key]['isSelected'] = 'false';
                }
                //console.log(JSON.stringify(notifications) + 'ddddddd');
                resolve(notifications);
              } else {
                console.log('Incorrect JSON');
              }
              //resolve(res);
            })
            .catch(e => {
              console.log('Incorrect JSON');
            });
        })
        .catch(e => {
          reject(e);
        });
    } catch (e) {
      console.log(e);
    }
  });
};

export var getnotificationCount = id => {
  let url = base_url + 'v1/notifications/count';
  return new Promise(function (resolve, reject) {
    try {
      //body = JSON.stringify(data);
      let requestConfig = {
        method: 'GET',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        //body: body,
      };
      fetch(url, requestConfig)
        .then(r => {
          //console.log('SuccessfullResult=>', r);
          r.json()
            .then(res => {
              resolve(res);
            })
            .catch(e => {
              console.log('Incorrect JSON');
            });
        })
        .catch(e => {
          reject(e);
        });
    } catch (e) {
      console.log(e);
    }
  });
};

export var notificationRead = id => {
  let url = base_url + 'v1/notifications/' + id + '/read?lang=' + languagee;
  return new Promise(function (resolve, reject) {
    try {
      //body = JSON.stringify(data);
      let requestConfig = {
        method: 'PUT',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        //body: body,
      };
      fetch(url, requestConfig)
        .then(r => {
          //console.log('SuccessfullResult=>', r);
          r.json()
            .then(res => {
              resolve(res);
            })
            .catch(e => {
              console.log('Incorrect JSON');
            });
        })
        .catch(e => {
          reject(e);
        });
    } catch (e) {
      console.log(e);
    }
  });
};

export var getuserProfile = () => {
  let url = base_url + `v1/customer/profile?lang=${languagee}`;
  return new Promise(function (resolve, reject) {
    try {
      //body = JSON.stringify(data);
      let requestConfig = {
        method: 'GET',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        //body: body,
      };
      fetch(url, requestConfig)
        .then(r => {
          //console.log('SuccessfullResult=>', r);
          r.json()
            .then(res => {
              resolve(res);
            })
            .catch(e => {
              console.log('Incorrect JSON');
            });
        })
        .catch(e => {
          reject(e);
        });
    } catch (e) {
      console.log(e);
    }
  });
};

export var saveProfilePicture = async pickImage => {
  let url = base_url + 'v1/customer/profile/photo?lang=' + languagee;
  // return new Promise(function (resolve, reject) {
  try {
    // let type = data.uri.split('.');
    let response = await RNFetchBlob.fetch(
      'PUT',
      `${url}`,
      {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
      [
        {
          name: 'profile',
          filename: 'abc.jpg',
          type: pickImage.mime,

          data: RNFetchBlob.wrap(pickImage.path),
        },
      ],
    );

    let res = await response.json();
    console.log(res, 'IMAGESSS');
    if (res.status === 'success') {
      //alert('success ');
    } else {
      //alert('failed');
    }
  } catch (error) {
    console.log('error');
  }
  // });
};

export var updateProfile = data => {
  let url = base_url + 'v1/customer/profile?lang=' + languagee;
  return new Promise(function (resolve, reject) {
    try {
      body = JSON.stringify(data);
      let requestConfig = {
        method: 'PUT',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: body,
      };
      fetch(url, requestConfig)
        .then(r => {
          //console.log('SuccessfullResult=>', r);
          r.json()
            .then(res => {
              resolve(res);
            })
            .catch(e => {
              console.log('Incorrect JSON');
            });
        })
        .catch(e => {
          reject(e);
        });
    } catch (e) {
      console.log(e);
    }
  });
};

export var contactSeller = data => {
  let url = base_url + 'v1/getInTouch?lang=' + languagee;
  return new Promise(function (resolve, reject) {
    try {
      body = JSON.stringify(data);
      let requestConfig = {
        method: 'POST',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: body,
      };
      fetch(url, requestConfig)
        .then(r => {
          //console.log('SuccessfullResult=>', r);
          r.json()
            .then(res => {
              resolve(res);
            })
            .catch(e => {
              console.log('Incorrect JSON');
            });
        })
        .catch(e => {
          reject(e);
        });
    } catch (e) {
      console.log(e);
    }
  });
};

export var SheduleMeeting = data => {
  let url = base_url + 'v1/ScheduleMeeting?lang=' + languagee;
  return new Promise(function (resolve, reject) {
    try {
      body = JSON.stringify(data);
      let requestConfig = {
        method: 'POST',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: body,
      };
      fetch(url, requestConfig)
        .then(r => {
          //console.log('SuccessfullResult=>', r);
          r.json()
            .then(res => {
              resolve(res);
            })
            .catch(e => {
              console.log('Incorrect JSON');
            });
        })
        .catch(e => {
          reject(e);
        });
    } catch (e) {
      console.log(e);
    }
  });
};

export var getWishList = () => {
  let url = base_url + `v1/${languagee}/wishlist`;
  return new Promise(function (resolve, reject) {
    try {
      //body = JSON.stringify(data);
      let requestConfig = {
        method: 'GET',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        //body: body,
      };
      fetch(url, requestConfig)
        .then(r => {
          //console.log('SuccessfullResult=>', r);
          r.json()
            .then(res => {
              resolve(res);
            })
            .catch(e => {
              console.log('Incorrect JSON');
            });
        })
        .catch(e => {
          reject(e);
        });
    } catch (e) {
      console.log(e);
    }
  });
};

export var sendFeedback = data => {
  let url = base_url + 'v1/suggestions?lang=' + languagee;
  return new Promise(function (resolve, reject) {
    try {
      body = JSON.stringify(data);
      let requestConfig = {
        method: 'POST',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: body,
      };
      fetch(url, requestConfig)
        .then(r => {
          console.log('SuccessfullResult=>', r.status);
          r.json()
            .then(res => {
              resolve(res);
            })
            .catch(e => {
              console.log('Incorrect JSON');
            });
        })
        .catch(e => {
          reject(e);
        });
    } catch (e) {
      console.log(e);
    }
  });
};

export var changePassword = data => {
  let url = base_url + 'v1/customer/changepassword?lang=' + languagee;
  return new Promise(function (resolve, reject) {
    try {
      body = JSON.stringify(data);
      let requestConfig = {
        method: 'POST',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: body,
      };
      fetch(url, requestConfig)
        .then(r => {
          //console.log('SuccessfullResult=>', r.status);
          r.json()
            .then(res => {
              resolve(res);
            })
            .catch(e => {
              console.log('Incorrect JSON');
            });
        })
        .catch(e => {
          reject(e);
        });
    } catch (e) {
      console.log(e);
    }
  });
};

export var contactUsConfiguration = () => {
  let url = base_url + `v1/configuration`;
  return new Promise(function (resolve, reject) {
    try {
      //body = JSON.stringify(data);
      let requestConfig = {
        method: 'GET',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        //body: body,
      };
      fetch(url, requestConfig)
        .then(r => {
          //console.log('SuccessfullResult=>', r);
          r.json()
            .then(res => {
              resolve(res);
            })
            .catch(e => {
              console.log('Incorrect JSON');
            });
        })
        .catch(e => {
          reject(e);
        });
    } catch (e) {
      console.log(e);
    }
  });
};

export var logout = data => {
  let url = base_url + 'v1/logout?lang=' + languagee;
  return new Promise(function (resolve, reject) {
    try {
      body = JSON.stringify(data);
      let requestConfig = {
        method: 'POST',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: body,
      };
      fetch(url, requestConfig)
        .then(r => {
          //console.log('SuccessfullResult=>', r);
          r.json()
            .then(res => {
              resolve(res);
            })
            .catch(e => {
              console.log('Incorrect JSON');
            });
        })
        .catch(e => {
          reject(e);
        });
    } catch (e) {
      console.log(e);
    }
  });
};

export var GetAllRequest = (pgno, pagesize) => {
  let url = base_url + `v1/customer/Requests`;
  return new Promise(function (resolve, reject) {
    try {
      //body = JSON.stringify(data);
      let requestConfig = {
        method: 'GET',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        //body: body,
      };
      fetch(url, requestConfig)
        .then(r => {
          //console.log('SuccessfullResult=>', r);
          r.json()
            .then(res => {
              resolve(res);
            })
            .catch(e => {
              console.log('blogs');
              console.log('Incorrect JSON');
            });
        })
        .catch(e => {
          reject(e);
        });
    } catch (e) {
      console.log(e);
    }
  });
};

export var PropertyRequestbyId = id => {
  let url = base_url + `v1/properties/Request/${id}`;
  return new Promise(function (resolve, reject) {
    try {
      //body = JSON.stringify(data);
      let requestConfig = {
        method: 'GET',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        //body: body,
      };
      fetch(url, requestConfig)
        .then(r => {
          //console.log('SuccessfullResult=>', r);
          r.json()
            .then(res => {
              resolve(res);
            })
            .catch(e => {
              console.log('blogs');
              console.log('Incorrect JSON');
            });
        })
        .catch(e => {
          reject(e);
        });
    } catch (e) {
      console.log(e);
    }
  });
};

export var MotorRequestbyId = id => {
  let url = base_url + `v1/cars/Request/${id}`;
  return new Promise(function (resolve, reject) {
    try {
      //body = JSON.stringify(data);
      let requestConfig = {
        method: 'GET',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        //body: body,
      };
      fetch(url, requestConfig)
        .then(r => {
          //console.log('SuccessfullResult=>', r);
          r.json()
            .then(res => {
              resolve(res);
            })
            .catch(e => {
              console.log('blogs');
              console.log('Incorrect JSON');
            });
        })
        .catch(e => {
          reject(e);
        });
    } catch (e) {
      console.log(e);
    }
  });
};

export var closeRequestProperty = id => {
  let url =
    base_url + 'v1/properties/Request/' + id + '/close?lang=' + languagee;
  return new Promise(function (resolve, reject) {
    try {
      //body = JSON.stringify(data);
      let requestConfig = {
        method: 'PUT',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        //body: body,
      };
      fetch(url, requestConfig)
        .then(r => {
          //console.log('SuccessfullResult=>', r);
          r.json()
            .then(res => {
              resolve(res);
            })
            .catch(e => {
              console.log('Incorrect JSON');
            });
        })
        .catch(e => {
          reject(e);
        });
    } catch (e) {
      console.log(e);
    }
  });
};

export var closeRequestCar = id => {
  let url = base_url + 'v1/cars/Request/' + id + '/close?lang=' + languagee;
  return new Promise(function (resolve, reject) {
    try {
      //body = JSON.stringify(data);
      let requestConfig = {
        method: 'PUT',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        //body: body,
      };
      fetch(url, requestConfig)
        .then(r => {
          //console.log('SuccessfullResult=>', r);
          r.json()
            .then(res => {
              resolve(res);
            })
            .catch(e => {
              console.log('Incorrect JSON');
            });
        })
        .catch(e => {
          reject(e);
        });
    } catch (e) {
      console.log(e);
    }
  });
};

export var propertyfiltersCategory = type => {
  //base_url + `v1/${languagee}/newsfeed/?pgno=${pgno}&pagesize=${pagesize}`;
  let url =
    base_url + `v1/property/filter/${languagee}/categories?Type=${type}`;
  return new Promise(function (resolve, reject) {
    try {
      //body = JSON.stringify(data);
      let requestConfig = {
        method: 'GET',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        //body: body,
      };
      fetch(url, requestConfig)
        .then(r => {
          //console.log('SuccessfullResult=>', r);
          r.json()
            .then(res => {
              resolve(res);
            })
            .catch(e => {
              console.log('blogs');
              console.log('Incorrect JSON');
            });
        })
        .catch(e => {
          reject(e);
        });
    } catch (e) {
      console.log(e);
    }
  });
};

export var carfiltersCategory = () => {
  let url = base_url + `v1/car/filter/${languagee}/categories`;
  return new Promise(function (resolve, reject) {
    try {
      //body = JSON.stringify(data);
      let requestConfig = {
        method: 'GET',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        //body: body,
      };
      fetch(url, requestConfig)
        .then(r => {
          //console.log('SuccessfullResult=>', r);
          r.json()
            .then(res => {
              resolve(res);
            })
            .catch(e => {
              console.log('blogs');
              console.log('Incorrect JSON');
            });
        })
        .catch(e => {
          reject(e);
        });
    } catch (e) {
      console.log(e);
    }
  });
};

export var postRequestCar = data => {
  let url = base_url + 'v1/Car/Request?lang=' + languagee;
  return new Promise(function (resolve, reject) {
    try {
      body = JSON.stringify(data);
      console.log(body);
      let requestConfig = {
        method: 'POST',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: body,
      };
      fetch(url, requestConfig)
        .then(r => {
          //console.log('SuccessfullResult=>', r);
          r.json()
            .then(res => {
              resolve(res);
            })
            .catch(e => {
              console.log('Incorrect JSON');
            });
        })
        .catch(e => {
          reject(e);
        });
    } catch (e) {
      console.log(e);
    }
  });
};

export var postRequestProperty = data => {
  let url = base_url + 'v1/properties/Request?lang=' + languagee;
  return new Promise(function (resolve, reject) {
    try {
      body = JSON.stringify(data);
      console.log(body);
      let requestConfig = {
        method: 'POST',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: body,
      };
      fetch(url, requestConfig)
        .then(r => {
          //console.log('SuccessfullResult=>', r);
          r.json()
            .then(res => {
              resolve(res);
            })
            .catch(e => {
              console.log('Incorrect JSON');
            });
        })
        .catch(e => {
          reject(e);
        });
    } catch (e) {
      console.log(e);
    }
  });
};

export var sendPushNotifcation = data => {
  let url = base_url + 'v1/sessions';
  return new Promise(function (resolve, reject) {
    try {
      body = JSON.stringify(data);
      let requestConfig = {
        method: 'POST',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: body,
      };
      fetch(url, requestConfig)
        .then(r => {
          //console.log('SuccessfullResult=>', r);
          r.json()
            .then(res => {
              resolve(res);
            })
            .catch(e => {
              console.log('Incorrect JSON');
            });
        })
        .catch(e => {
          reject(e);
        });
    } catch (e) {
      console.log(e);
    }
  });
};

export var getPrice = data => {
  let url = base_url + 'v1/property/masterdata';

  return new Promise(function (resolve, reject) {
    try {
      body = JSON.stringify(data);
      let requestConfig = {
        method: 'GET',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: body,
      };
      fetch(url, requestConfig)
        .then(r => {
          //console.log('SuccessfullResult=>', r);
          r.json()
            .then(res => {
              resolve(res);
            })
            .catch(e => {
              console.log('Incorrect JSON');
            });
        })
        .catch(e => {
          reject(e);
        });
    } catch (e) {
      console.log(e);
    }
  });
};

export var getMotorPrice = data => {
  let url = base_url + 'v1/car/maxValue';

  return new Promise(function (resolve, reject) {
    try {
      body = JSON.stringify(data);
      let requestConfig = {
        method: 'GET',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: body,
      };
      fetch(url, requestConfig)
        .then(r => {
          //console.log('SuccessfullResult=>', r);
          r.json()
            .then(res => {
              resolve(res);
            })
            .catch(e => {
              console.log('Incorrect JSON');
            });
        })
        .catch(e => {
          reject(e);
        });
    } catch (e) {
      console.log(e);
    }
  });
};

export var getAllmasterData = () => {
  let url = base_url + 'v1/vendor/masterdata';
  return new Promise(function (resolve, reject) {
    try {
      //body = JSON.stringify(data);
      let requestConfig = {
        method: 'GET',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        //body: body,
      };
      fetch(url, requestConfig)
        .then(r => {
          //console.log('SuccessfullResult=>', r);
          r.json()
            .then(res => {
              resolve(res);
            })
            .catch(e => {
              console.log('Incorrect JSON');
            });
        })
        .catch(e => {
          reject(e);
        });
    } catch (e) {
      console.log(e);
    }
  });
};

export var contactUs = data => {
  let url = base_url + 'v1/ContactUs?lang=' + languagee;

  return new Promise(function (resolve, reject) {
    try {
      body = JSON.stringify(data);
      // alert(body);
      let requestConfig = {
        method: 'POST',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: body,
      };
      fetch(url, requestConfig)
        .then(r => {
          //console.log('SuccessfullResult=>', r);
          r.json()
            .then(res => {
              //console.log(res);
              resolve(res);
              //setWishlist(res);
            })
            .catch(e => {
              console.log('123');
              console.log('Incorrect JSON');
            });
        })
        .catch(e => {
          reject(e);
        });
    } catch (e) {
      console.log(e);
    }
  });
};

// export var getlistTask = () => {
//   let url = 'https://api.publicapis.org/entries';

//   // return async (dispatch, getState) => {
//   const length = await new Promise(function (resolve, reject) {
//     let requestConfig = {
//       method: 'GET',
//       // headers: header,
//     };

//     fetch(url, requestConfig)
//       .then(r => {
//         r.json()
//           .then(res => {
//             // console.log(res.count);
//             resolve(res.length);
//             console.log('successsfull');
//             // console.log(res);
//           })
//           .catch(e => {
//             console.log('Incorrect JSON');
//           });
//       })
//       .catch(e => {
//         //console.log('Incorrect JSON');
//         reject(e);
//       });
//   });
// };

// export const getWishlist = async () => {
//   setLoading(true);
//   const access_token = store.getState().auth.access_token;
//   try {
//     let response = await fetch(
//       `${apiEndpoint}api/v1/${localizedString.getLanguage()}/wishlist`,
//       {
//         method: 'get',
//         headers: {
//           Accept: '*/*',
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${access_token}`,
//         },
//       },
//     );
//     if (!response.ok) {
//       throw await response.json();
//     }
//     response = await response.json();
//     console.log('getWishlist:', JSON.stringify(response));
//     setWishlist(response.wishlist);
//     // return response.wishlist;
//   } catch (error) {
//     console.log('getWishlist Error', error);
//     errorHandler(error);
//   } finally {
//     setLoading(false);
//   }
// };
