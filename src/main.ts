import { QueryClient } from '@tanstack/query-core'
import { TanstackQueryDevtoolsPanel } from '@tanstack/query-devtools'
import { broadcastQueryClient } from './broadcast.ts'


const queryClient = new QueryClient();

const devtools = new TanstackQueryDevtoolsPanel({
  client: queryClient,
});

devtools.mount(document.querySelector<HTMLElement>('#app')!);

broadcastQueryClient('react-query', queryClient);
