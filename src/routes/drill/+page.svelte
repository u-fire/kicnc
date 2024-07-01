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
	import * as ToggleGroup from "$lib/components/ui/toggle-group/index.js";

	import { millproject } from '$lib/store';

</script>

<div class="grid gap-6">
	<h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">Drill</h3>
	<p class="text-sm font-medium leading-none">Drill holes for PTH components and vias</p>
	<Card.Root>
		<Card.Header>
			<Card.Title>Depth</Card.Title><p class="italic text-xs">required</p>
			<Card.Description>Drill depth</Card.Description>
		</Card.Header>
		<Card.Content>
			<form>
				<Input bind:value={ $millproject.drill.zdrill } type="number" step="0.01" />
			</form>
		</Card.Content>
		<!-- <Card.Footer class="border-t px-6 py-4">
            <Button>Save</Button>
        </Card.Footer> -->
	</Card.Root>

	<Card.Root>
		<Card.Header>
			<Card.Title>Feedrate</Card.Title><p class="italic text-xs">required</p>
			<Card.Description>How fast to plunge the drill bit</Card.Description>
		</Card.Header>
		<Card.Content>
			<form>
				<Input bind:value={ $millproject.drill['drill-feed'] } type="number" min="1" step="1" placeholder="50" />
			</form>
		</Card.Content>
		<!-- <Card.Footer class="border-t px-6 py-4">
            <Button>Save</Button>
        </Card.Footer> -->
	</Card.Root>

    <Card.Root>
		<Card.Header>
			<Card.Title>Speed</Card.Title><p class="italic text-xs">required</p>
			<Card.Description>Spindle RPM when drilling</Card.Description>
		</Card.Header>
		<Card.Content>
			<form>
				<Input bind:value={ $millproject.drill['drill-speed'] } type="number" min="1" step="1000" placeholder="10000" />
			</form>
		</Card.Content>
		<!-- <Card.Footer class="border-t px-6 py-4">
            <Button>Save</Button>
        </Card.Footer> -->
	</Card.Root>

	<Card.Root>
		<Card.Header>
			<Card.Title>Output</Card.Title>
			<Card.Description>Name for the G-code file</Card.Description>
		</Card.Header>
		<Card.Content>
			<Label for="drill-output">Front</Label>
			<Input id="drill-output" bind:value={$millproject.drill['drill-output'] } placeholder="drill.gcode" />
			
		</Card.Content>
		<!-- <Card.Footer class="border-t px-6 py-4">
            <Button>Save</Button>
        </Card.Footer> -->
	</Card.Root>

	<Card.Root>
		<Card.Header>
			<Card.Title>Bits</Card.Title>
			<Card.Description>List of drill bits available</Card.Description>
		</Card.Header>
		<Card.Content>
			<form>
				<Input bind:value={ $millproject.drill['drills-available'] } placeholder="0.5mm, 1mm" />
			</form>
		</Card.Content>
		<!-- <Card.Footer class="border-t px-6 py-4">
            <Button>Save</Button>
        </Card.Footer> -->
	</Card.Root>

    <Card.Root>
		<Card.Header>
			<Card.Title>Milldrill</Card.Title>
			<Card.Description>Use milling bits and carve holes</Card.Description>
		</Card.Header>
		<Card.Content>
			<form>
				<div class="flex items-center space-x-2">
					<Switch bind:checked={ $millproject.drill.milldrill } id="milldrill" />
					<Label for="milldrill">Use milldrilling</Label>
				</div>
				<br />
				<Label for="drill-output">Bit diameter</Label>
				<Input id="drill-output" bind:value={$millproject.drill['milldrill-diameter'] } placeholder="1.0" />
			</form>
		</Card.Content>
		<!-- <Card.Footer class="border-t px-6 py-4">
            <Button>Save</Button>
        </Card.Footer> -->
	</Card.Root>

	<Card.Root>
		<Card.Header>
			<Card.Title>Side</Card.Title>
			<Card.Description>Drilling side</Card.Description>
		</Card.Header>
		<Card.Content>
			<ToggleGroup.Root type="single" bind:value={$millproject.drill['drill-side'] }>
				<ToggleGroup.Item value="" aria-label="Auto">
				  Auto
				</ToggleGroup.Item>
				<ToggleGroup.Item value="front" aria-label="Front">
				  Front
				</ToggleGroup.Item>
				<ToggleGroup.Item value="back" aria-label="Back">
				  Back
				</ToggleGroup.Item>
			  </ToggleGroup.Root>
		</Card.Content>
		<!-- <Card.Footer class="border-t px-6 py-4">
            <Button>Save</Button>
        </Card.Footer> -->
	</Card.Root>

</div>