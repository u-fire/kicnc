<script lang="ts">
	import { Label } from '$lib/components/ui/label/index.js';
	import { Switch } from '$lib/components/ui/switch/index.js';

	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { millproject } from '$lib/store';

	let zero_start = true;
</script>

<div class="grid gap-6">
	<h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">Common</h3>
	<p class="text-sm font-medium leading-none">Common options for all operations</p>
	<Card.Root>
		<Card.Header>
			<Card.Title>Z Safe</Card.Title>
			<p class="text-xs italic">required</p>
			<Card.Description>Z-coordinate during rapid moves</Card.Description>
		</Card.Header>
		<Card.Content>
			<Input bind:value={$millproject.common.zsafe} type="number" placeholder="5" />
		</Card.Content>
		<!-- <Card.Footer class="border-t px-6 py-4">
            <Button>Save</Button>
        </Card.Footer> -->
	</Card.Root>

	<Card.Root>
		<Card.Header>
			<Card.Title>Z Tool Change</Card.Title>
			<p class="text-xs italic">required</p>
			<Card.Description>Tool changing height</Card.Description>
		</Card.Header>
		<Card.Content>
			<form>
				<Input bind:value={$millproject.common.zchange} type="number" placeholder="5" />
			</form>
		</Card.Content>
		<!-- <Card.Footer class="border-t px-6 py-4">
            <Button>Save</Button>
        </Card.Footer> -->
	</Card.Root>

	<Card.Root>
		<Card.Header>
			<Card.Title>Zero Start</Card.Title>
			<Card.Description>Set the starting point of the project at (0,0)</Card.Description>
		</Card.Header>
		<Card.Content>
			<form class="flex flex-col gap-4">
				<div class="flex items-center space-x-2">
					<Switch id="zero-start" bind:checked={$millproject.common['zero-start']} />
				</div>
			</form>
		</Card.Content>
		<!-- <Card.Footer class="border-t px-6 py-4">
            <Button>Save</Button>
        </Card.Footer> -->
	</Card.Root>

	<Card.Root>
		<Card.Header>
			<Card.Title>Offsets</Card.Title>
			<Card.Description>Offset the origin in the X/Y axis by this length</Card.Description>
		</Card.Header>
		<Card.Content>
			<form>
				<Label for="x_offset">X Offset</Label>
				<Input
					id="x_offset"
					type="number"
					placeholder="0"
					bind:value={$millproject.common['x-offset']}
				/>
				<br />
				<Label for="y_offset">Y Offset</Label>
				<Input
					id="y_offset"
					type="number"
					placeholder="0"
					bind:value={$millproject.common['y-offset']}
				/>
			</form>
		</Card.Content>
		<!-- <Card.Footer class="border-t px-6 py-4">
            <Button>Save</Button>
        </Card.Footer> -->
	</Card.Root>

	<Card.Root>
		<Card.Header>
			<Card.Title>Tiling</Card.Title>
			<Card.Description>Number of tiling columns and rows</Card.Description>
		</Card.Header>
		<Card.Content>
			<form>
				<Label for="tiling_columns">Columns</Label>
				<Input
					id="tiling_columns"
					type="number"
					placeholder="1"
					bind:value={$millproject.common['tile-x']}
				/>
				<br />
				<Label for="tiling_rows">Rows</Label>
				<Input
					id="tiling_rows"
					type="number"
					placeholder="1"
					bind:value={$millproject.common['tile-y']}
				/>
			</form>
		</Card.Content>
		<!-- <Card.Footer class="border-t px-6 py-4">
            <Button>Save</Button>
        </Card.Footer> -->
	</Card.Root>
</div>
