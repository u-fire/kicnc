<script lang="ts">
	import CircleUser from 'lucide-svelte/icons/circle-user';
	import Menu from 'lucide-svelte/icons/menu';
	import Package2 from 'lucide-svelte/icons/package-2';
	import Search from 'lucide-svelte/icons/search';

	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
    import { Label } from '$lib/components/ui/label/index.js';
	import { Switch } from '$lib/components/ui/switch/index.js';

	import { millproject } from '$lib/store';

</script>

<div class="grid gap-6">
	<h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">Stencil</h3>
	<p class="text-sm font-medium leading-none">Make a soldermask stencil</p>

	<Card.Root>
		<Card.Header>
			<Card.Title>Feedrate</Card.Title><p class="italic text-xs">required</p>
			<Card.Description>Feedrate while isolating in [i/m] or [mm/m]</Card.Description>
		</Card.Header>
		<Card.Content>
			<form>
				<Input bind:value={ $millproject.stencil['stencil-mill-feed'] } type="number" min="1" step="1" placeholder="500" />
			</form>
		</Card.Content>
		<!-- <Card.Footer class="border-t px-6 py-4">
            <Button>Save</Button>
        </Card.Footer> -->
	</Card.Root>

    <Card.Root>
		<Card.Header>
			<Card.Title>Speed/Power</Card.Title><p class="italic text-xs">required</p>
			<Card.Description>Spindle RPM/laser power</Card.Description>
		</Card.Header>
		<Card.Content>
			<form>
				<Input bind:value={ $millproject.stencil['stencil-mill-speed'] } type="number" min="1" step="1000" placeholder="10000" />
			</form>
		</Card.Content>
		<!-- <Card.Footer class="border-t px-6 py-4">
            <Button>Save</Button>
        </Card.Footer> -->
	</Card.Root>

	<Card.Root>
		<Card.Header>
			<Card.Title>Diameter</Card.Title>
			<Card.Description>Diameters of mill bits, used in the order that they are provided</Card.Description>
		</Card.Header>
		<Card.Content>
			<form>
				<Input bind:value={ $millproject.stencil['stencil-mill-diameters'] } placeholder="0.1" />
			</form>
		</Card.Content>
		<!-- <Card.Footer class="border-t px-6 py-4">
            <Button>Save</Button>
        </Card.Footer> -->
	</Card.Root>

	<Card.Root>
		<Card.Header>
			<Card.Title>Cutout</Card.Title>
			<Card.Description>Cutout the pads edges only, or pass over the entire pad region?</Card.Description>
		</Card.Header>
		<Card.Content>
			<form class="flex flex-col gap-4">
				<div class="flex items-center space-x-2">
					<Label for="cutout">Pad outline only</Label>
					<Switch bind:checked={ $millproject.stencil['stencil-invert-gerbers'] } id="cutout" />
					<Label for="cutout">Entire pad</Label>
				</div>
			</form>
		</Card.Content>
		<!-- <Card.Footer class="border-t px-6 py-4">
            <Button>Save</Button>
        </Card.Footer> -->
	</Card.Root>

	<Card.Root>
		<Card.Header>
			<Card.Title>Outputs</Card.Title>
			<Card.Description>Name for the G-code file</Card.Description>
		</Card.Header>
		<Card.Content>
			<Input bind:value={$millproject.stencil['stencil-front-output'] } placeholder="stencil.nc" />
		</Card.Content>
		<!-- <Card.Footer class="border-t px-6 py-4">
            <Button>Save</Button>
        </Card.Footer> -->
	</Card.Root>

    <Card.Root>
		<Card.Header>
			<Card.Title>Overlap</Card.Title>
			<Card.Description>How much to overlap milling passes, from 0% to 100% or an absolute length</Card.Description>
		</Card.Header>
		<Card.Content>
			<form>
				<Input bind:value={ $millproject.stencil['stencil-milling-overlap'] } placeholder="25 % -or- 1 mm" />
			</form>
		</Card.Content>
		<!-- <Card.Footer class="border-t px-6 py-4">
            <Button>Save</Button>
        </Card.Footer> -->
	</Card.Root>

	<Card.Root>
		<Card.Header>
			<Card.Title>Depth</Card.Title><p class="italic text-xs">required</p>
			<Card.Description>Milling depth</Card.Description>
		</Card.Header>
		<Card.Content>
			<form>
				<Input bind:value={ $millproject.stencil['stencil-zwork'] } type="number" step="0.01" placeholder="0" />
			</form>
		</Card.Content>
		<!-- <Card.Footer class="border-t px-6 py-4">
            <Button>Save</Button>
        </Card.Footer> -->
	</Card.Root>
</div>