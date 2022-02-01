  const wax = new waxjs.WaxJS({
    rpcEndpoint: 'https://wax.greymass.com'
  });

  async function login() {
    try {
      const userAccount = await wax.login();
      document.getElementById('updater').value = userAccount;
      await getCurrentMessage();
      return wax.userAccount
    } catch(e) {
      document.getElementById('response').append(e.message);
    }
  }

async function recover(energy) {
    try {
      const result = await wax.api.transact({
        actions: [
          {
              account: "farmersworld",
              name: "recover",
              authorization: [
                  {
                      actor: wax.userAccount,
                      permission: "active",
                  },
              ],
              data: {
                  owner: wax.userAccount,
                  energy_recovered: energy,
              },
          },
      ]
      }, {
        blocksBehind: 3,
        expireSeconds: 30
      });
      const traces = result['processed']['action_traces']
      return {'status' : true, 'message': traces}
    } catch(e) {
      return {'status' : true, 'message': e.message}
    }
  }
  
  async function tools(id) {
      try {
        const result = await wax.api.transact({
          actions: [
              {
                  account: "farmersworld",
                  name: "claim",
                  authorization: [
                      {
                          actor: wax.userAccount,
                          permission: "active",
                      },
                  ],
                  data: {
                      owner: wax.userAccount,
                      asset_id: id,
                  },
              },
          ]
        }, {
          blocksBehind: 3,
          expireSeconds: 30
        });
        const traces = result['processed']['action_traces']
        return {'status' : true, 'message': traces}
      } catch(e) {
        return {'status' : true, 'message': e.message}
      }
    }
  
    async function crops(id) {
      try {
        const result = await wax.api.transact({
          actions: [
            {
                account: "farmersworld",
                name: "cropclaim",
                authorization: [
                    {
                        actor: wax.userAccount,
                        permission: "active",
                    },
                ],
                data: {
                    owner: wax.userAccount,
                    crop_id: id
                },
            },
        ]
        }, {
          blocksBehind: 3,
          expireSeconds: 1200,
        });
        return {'status' : true, 'message': result}
      } catch(e) {
        return {'status' : true, 'message': e.message}
      }
    }
  
    async function repair(id) {
      try {
        const result = await wax.api.transact({
          actions: [
            {
                account: "farmersworld",
                name: "repair",
                authorization: [
                    {
                        actor: wax.userAccount,
                        permission: "active",
                    },
                ],
                data: {
                  asset_owner: wax.userAccount,
                  asset_id: id,
                },
            },
        ]
        }, {
          blocksBehind: 3,
          expireSeconds: 1200,
        });
        return {'status' : true, 'message': result}
      } catch(e) {
        return {'status' : true, 'message': e.message}
      }
    }
  
