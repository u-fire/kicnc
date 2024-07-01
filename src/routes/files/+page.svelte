<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as ToggleGroup from '$lib/components/ui/toggle-group/index.js';
	import { Switch } from '$lib/components/ui/switch/index.js';
	import { Label } from '$lib/components/ui/label/index.js';

	import { open } from '@tauri-apps/api/dialog';
	import { exists } from '@tauri-apps/api/fs';
	import {
		millproject,
		mask_gerber_file,
		paste_gerber_file,
		project_dir,
		make_disabled
	} from '$lib/store';
	import { readTextFile } from '@tauri-apps/api/fs';

	let front_gerber_file = '';
	let back_gerber_file = '';
	let drill_file = '';
	let outline_gerber_file = '';

	const filters = [
		{ name: 'Gerber', extensions: ['gbr', 'drl'] },
		{ name: 'All files', extensions: ['*'] }
	];

	async function open_millproject() {
		let contents: string = '';

		const cross_platform_path = $millproject.files.front
			.replace(/[\\/]+/g, '/')
			.replace(/^(\.\/)/, '');
		$project_dir = cross_platform_path.substring(0, cross_platform_path.lastIndexOf('/') + 1);

		if (await exists($project_dir + 'millproject-kicnc')) {
			contents = await readTextFile($project_dir + 'millproject-kicnc');
		} else {
			return;
		}

		var lines = contents.split('\n');
		for (var i = 0; i < lines.length; i++) {
			var line = lines[i].split('=');
			if ($millproject.files.hasOwnProperty(line[0])) {
				$millproject.files[line[0] as keyof typeof $millproject.files] = line[1];
			}
			if ($millproject.common.hasOwnProperty(line[0])) {
				$millproject.common[line[0] as keyof typeof $millproject.common] = line[1] as never;
			}
			if ($millproject.milling.hasOwnProperty(line[0])) {
				$millproject.milling[line[0] as keyof typeof $millproject.milling] = line[1] as never;
			}
			if ($millproject.drill.hasOwnProperty(line[0])) {
				$millproject.drill[line[0] as keyof typeof $millproject.drill] = line[1] as never;
			}
			if ($millproject.outline.hasOwnProperty(line[0])) {
				$millproject.outline[line[0] as keyof typeof $millproject.outline] = line[1] as never;
			}
			if ($millproject.stencil.hasOwnProperty(line[0])) {
				$millproject.stencil[line[0] as keyof typeof $millproject.stencil] = line[1] as never;
			}
			if ($millproject.mask.hasOwnProperty(line[0])) {
				$millproject.mask[line[0] as keyof typeof $millproject.mask] = line[1] as never;
			}
		}

		if (($millproject.common['metric'] as unknown) == 'true') {
			$millproject.common['metric'] = true;
		} else {
			$millproject.common['metric'] = false;
		}

		if (($millproject.common['zero-start'] as unknown) == 'true') {
			$millproject.common['zero-start'] = true;
		} else {
			$millproject.common['zero-start'] = false;
		}

		if (($millproject.milling['voronoi'] as unknown) == 'true') {
			$millproject.milling['voronoi'] = true;
		} else {
			$millproject.milling['voronoi'] = false;
		}

		if (($millproject.milling['invert-gerbers'] as unknown) == 'true') {
			$millproject.milling['invert-gerbers'] = true;
		} else {
			$millproject.milling['invert-gerbers'] = false;
		}

		if (($millproject.drill['milldrill'] as unknown) == 'true') {
			$millproject.drill['milldrill'] = true;
		} else {
			$millproject.drill['milldrill'] = false;
		}

		if (($millproject.stencil['stencil-invert-gerbers'] as unknown) == 'true') {
			$millproject.stencil['stencil-invert-gerbers'] = true;
		} else {
			$millproject.stencil['stencil-invert-gerbers'] = false;
		}

		if (($millproject.mask['mask-invert-gerbers'] as unknown) == 'true') {
			$millproject.mask['mask-invert-gerbers'] = true;
		} else {
			$millproject.mask['mask-invert-gerbers'] = false;
		}
	}

	async function open_front_gerber() {
		const selected = await open({
			title: 'Open Front Gerber File',
			multiple: false,
			directory: false,
			filters
		});

		if (selected != null) {
			front_gerber_file = selected as string;
			$millproject.files.front = front_gerber_file;
			open_millproject();
			$make_disabled = false;

			let base_name = front_gerber_file.split('-F_Cu.gbr')[0];

			if (await exists(base_name + '-B_Cu.gbr')) {
				back_gerber_file = base_name + '-B_Cu.gbr';
				$millproject.files.back = back_gerber_file;
			}
			if (await exists(base_name + '.drl')) {
				drill_file = base_name + '.drl';
				$millproject.files.drill = drill_file;
			}
			if (await exists(base_name + '-Edge_Cuts.gbr')) {
				outline_gerber_file = base_name + '-Edge_Cuts.gbr';
				$millproject.files.outline = outline_gerber_file;
			}
			if (await exists(base_name + '-F_Paste.gbr')) {
				$paste_gerber_file = base_name + '-F_Paste.gbr';
			}
			if (await exists(base_name + '-F_Mask.gbr')) {
				$mask_gerber_file = base_name + '-F_Mask.gbr';
			}
		}
	}

	async function open_back_gerber() {
		const selected = await open({
			title: 'Open Database',
			multiple: false,
			directory: false,
			filters
		});

		if (selected != null) {
			back_gerber_file = selected as string;
			$millproject.files.back = back_gerber_file;
		}
	}

	async function open_drill_file() {
		const selected = await open({
			title: 'Open Database',
			multiple: false,
			directory: false,
			filters
		});

		if (selected != null) {
			drill_file = selected as string;
			$millproject.files.drill = drill_file;
		}
	}

	async function open_outline_gerber() {
		const selected = await open({
			title: 'Open Database',
			multiple: false,
			directory: false,
			filters
		});

		if (selected != null) {
			outline_gerber_file = selected as string;
			$millproject.files.outline = outline_gerber_file;
		}
	}

	async function open_mask_gerber() {
		const selected = await open({
			title: 'Open Database',
			multiple: false,
			directory: false,
			filters
		});

		if (selected != null) {
			$mask_gerber_file = selected as string;
		}
	}

	async function open_paste_gerber() {
		const selected = await open({
			title: 'Open Database',
			multiple: false,
			directory: false,
			filters
		});

		if (selected != null) {
			$paste_gerber_file = selected as string;
		}
	}
</script>

<div class="grid gap-6">
	<h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">Files</h3>
	<p class="text-sm font-medium leading-none">
		Gerber files for the PCB. Open the front file and the rest will be auto-filled. If a save-file
		is present in the directory, it will be opened.
	</p>
	<Card.Root>
		<Card.Header>
			<Card.Title>Front</Card.Title>
			<Card.Description>The top-layer copper gerber file</Card.Description>
		</Card.Header>
		<Card.Content>
			<form class="flex w-full items-center space-x-2">
				<Input bind:value={$millproject.files.front} />
				<Button on:click={open_front_gerber}>Select</Button>
			</form>
		</Card.Content>
		<!-- <Card.Footer class="border-t px-6 py-4">
            <Button>Save</Button>
        </Card.Footer> -->
	</Card.Root>

	<Card.Root>
		<Card.Header>
			<Card.Title>Back</Card.Title>
			<Card.Description>The back-layer copper gerber file</Card.Description>
		</Card.Header>
		<Card.Content>
			<form class="flex w-full items-center space-x-2">
				<Input bind:value={$millproject.files.back} />
				<Button on:click={open_back_gerber}>Select</Button>
			</form>
		</Card.Content>
		<!-- <Card.Footer class="border-t px-6 py-4">
            <Button>Save</Button>
        </Card.Footer> -->
	</Card.Root>
	<Card.Root>
		<Card.Header>
			<Card.Title>Drill</Card.Title>
			<Card.Description>Drill file</Card.Description>
		</Card.Header>
		<Card.Content>
			<form class="flex w-full items-center space-x-2">
				<Input bind:value={$millproject.files.drill} />
				<Button on:click={open_drill_file}>Select</Button>
			</form>
		</Card.Content>
		<!-- <Card.Footer class="border-t px-6 py-4">
            <Button>Save</Button>
        </Card.Footer> -->
	</Card.Root>

	<Card.Root>
		<Card.Header>
			<Card.Title>Outline</Card.Title>
			<Card.Description>Gerber with the board's outline</Card.Description>
		</Card.Header>
		<Card.Content>
			<form class="flex w-full items-center space-x-2">
				<Input bind:value={$millproject.files.outline} />
				<Button on:click={open_outline_gerber}>Select</Button>
			</form>
		</Card.Content>
		<!-- <Card.Footer class="border-t px-6 py-4">
            <Button>Save</Button>
        </Card.Footer> -->
	</Card.Root>

	<Card.Root>
		<Card.Header>
			<Card.Title>Mask</Card.Title>
			<Card.Description>Gerber mask file</Card.Description>
		</Card.Header>
		<Card.Content>
			<form class="flex w-full items-center space-x-2">
				<Input bind:value={$mask_gerber_file} />
				<Button on:click={open_mask_gerber}>Select</Button>
			</form>
		</Card.Content>
		<!-- <Card.Footer class="border-t px-6 py-4">
            <Button>Save</Button>
        </Card.Footer> -->
	</Card.Root>

	<Card.Root>
		<Card.Header>
			<Card.Title>Paste</Card.Title>
			<Card.Description>The paste file for making a stencil</Card.Description>
		</Card.Header>
		<Card.Content>
			<form class="flex w-full items-center space-x-2">
				<Input bind:value={$paste_gerber_file} />
				<Button on:click={open_paste_gerber}>Select</Button>
			</form>
		</Card.Content>
		<!-- <Card.Footer class="border-t px-6 py-4">
            <Button>Save</Button>
        </Card.Footer> -->
	</Card.Root>

	<Card.Root>
		<Card.Header>
			<Card.Title>Gerber Units</Card.Title>
			<Card.Description>Metric or imperial measurements</Card.Description>
		</Card.Header>
		<Card.Content>
			<form class="flex flex-col gap-4">
				<div class="flex items-center space-x-2">
					<Switch id="metric" bind:checked={$millproject.common['metric']} />
					<Label for="metric">Metric</Label>
				</div>
			</form>
		</Card.Content>
		<!-- <Card.Footer class="border-t px-6 py-4">
            <Button>Save</Button>
        </Card.Footer> -->
	</Card.Root>
</div>
