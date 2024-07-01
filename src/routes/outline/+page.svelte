<script lang="ts">
	import { Label } from '$lib/components/ui/label/index.js';
	import * as ToggleGroup from "$lib/components/ui/toggle-group/index.js";

	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { millproject } from '$lib/store';
	let drill_side = '';
</script>

<div class="grid gap-6">
	<h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">Outline</h3>
	<p class="text-sm font-medium leading-none">Cut the board out of the PCB blank</p>

	<Card.Root>
		<Card.Header>
			<Card.Title>Diameter</Card.Title><p class="italic text-xs">required</p>
			<Card.Description>Diameter of the end mill used for cutting out the PCB</Card.Description>
		</Card.Header>
		<Card.Content>
			<Input bind:value={$millproject.outline['cutter-diameter']} type="number" />
		</Card.Content>
		<!-- <Card.Footer class="border-t px-6 py-4">
            <Button>Save</Button>
        </Card.Footer> -->
	</Card.Root>

	<Card.Root>
		<Card.Header>
			<Card.Title>Depth</Card.Title><p class="italic text-xs">required</p>
			<Card.Description>PCB cutting depth</Card.Description>
		</Card.Header>
		<Card.Content>
			<Label for="zcut">Max</Label>
			<Input id="zcut" bind:value={$millproject.outline['zcut'] } type="number" />
			<br />
			<Label for="cut-infeed">Step</Label>
			<Input id="cut-infeed" type="number" placeholder="0" bind:value={$millproject.outline['cut-infeed']} />
		</Card.Content>
		<!-- <Card.Footer class="border-t px-6 py-4">
            <Button>Save</Button>
        </Card.Footer> -->
	</Card.Root>

	<Card.Root>
		<Card.Header>
			<Card.Title>Feedrate</Card.Title><p class="italic text-xs">required</p>
			<Card.Description>PCB cutting feedrate</Card.Description>
		</Card.Header>
		<Card.Content>
			<Label for="cut-feed">Horizontal</Label>
			<Input id="cut-feed" bind:value={$millproject.outline['cut-feed'] } type="number" />
			<br />
			<Label for="cut-vertfeed">Vertical</Label>
			<Input id="cut-vertfeed" bind:value={$millproject.outline['cut-vertfeed'] } type="number" />
		</Card.Content>
		<!-- <Card.Footer class="border-t px-6 py-4">
            <Button>Save</Button>
        </Card.Footer> -->
	</Card.Root>

	<Card.Root>
		<Card.Header>
			<Card.Title>Speed</Card.Title><p class="italic text-xs">required</p>
			<Card.Description>Spindle rpm when cutting</Card.Description>
		</Card.Header>
		<Card.Content>
			<Input bind:value={$millproject.outline['cut-speed'] } type="number" />
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
			<Input bind:value={$millproject.outline['outline-output'] } placeholder="outline.nc" />
		</Card.Content>
		<!-- <Card.Footer class="border-t px-6 py-4">
            <Button>Save</Button>
        </Card.Footer> -->
	</Card.Root>

	<Card.Root>
		<Card.Header>
			<Card.Title>Side</Card.Title>
			<Card.Description>Cut side</Card.Description>
		</Card.Header>
		<Card.Content>
			<ToggleGroup.Root type="single" bind:value={$millproject.outline['cut-side'] }>
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

	<Card.Root>
		<Card.Header>
			<Card.Title>Bridges</Card.Title>
			<Card.Description>Outline bridges</Card.Description>
		</Card.Header>
		<Card.Content>
			<Label for="bridges">Bridge width</Label>
			<Input id="bridges" bind:value={$millproject.outline['bridges'] } type="number" placeholder="4" />
			<br />
			<Label for="bridgesnum">Number of bridges</Label>
			<Input id="bridgesnum" bind:value={$millproject.outline['bridgesnum'] } type="number" placeholder="4" />
			<br />
			<Label for="zbridges">Bridge depth</Label>
			<Input id="zbridges" bind:value={$millproject.outline['zbridges'] } type="number" placeholder="1.5"/>
		</Card.Content>
		<!-- <Card.Footer class="border-t px-6 py-4">
            <Button>Save</Button>
        </Card.Footer> -->
	</Card.Root>
</div>
