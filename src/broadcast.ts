import { createRNIDEProxyClient } from "./radon_proxy";

export function broadcastQueryClient(scope: string, queryClient) {
  const proxy = createRNIDEProxyClient(scope);

  let transaction = false;
  const tx = (cb: () => void) => {
    transaction = true;
    cb();
    transaction = false;
  };

  const queryCache = queryClient.getQueryCache();

  queryClient.getQueryCache().subscribe((queryEvent) => {
    console.log("QUERY EVENT", queryEvent);
    //   if (transaction) {
    //     return
    //   }

    //   const {
    //     query: { queryHash, queryKey, state },
    //   } = queryEvent

    //   if (queryEvent.type === 'updated' && queryEvent.action.type === 'success') {
    //     channel.postMessage({
    //       type: 'updated',
    //       queryHash,
    //       queryKey,
    //       state,
    //     })
    //   }

    //   if (queryEvent.type === 'removed') {
    //     channel.postMessage({
    //       type: 'removed',
    //       queryHash,
    //       queryKey,
    //     })
    //   }
  });

  proxy.addMessageListener("updated", (action) => {
    console.log("QUERY EVENT updated",  action);

    tx(() => {
      const { queryHash, queryKey, state } = action;

      const query = queryCache.get(queryHash);

      if (query) {
        query.setState(state);
        return;
      }

      queryCache.build(
        queryClient,
        {
          queryKey,
          queryHash,
        },
        state
      );
    });
  });

  proxy.addMessageListener("removed", (action) => {
   console.log("QUERY EVENT removed",  action);
    
    tx(() => {
      const { queryHash } = action;
      const query = queryCache.get(queryHash);

      if (query) {
        queryCache.remove(query);
      }
    });
  });

//   channel.onmessage = (action) => {
//     if (!action?.type) {
//       return;
//     }

//     tx(() => {
//       const { type, queryHash, queryKey, state } = action;

//       if (type === "updated") {
//         const query = queryCache.get(queryHash);

//         if (query) {
//           query.setState(state);
//           return;
//         }

//         queryCache.build(
//           queryClient,
//           {
//             queryKey,
//             queryHash,
//           },
//           state
//         );
//       } else if (type === "removed") {
//         const query = queryCache.get(queryHash);

//         if (query) {
//           queryCache.remove(query);
//         }
//       }
//     });
//   };
}
