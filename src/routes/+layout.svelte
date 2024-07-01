<script lang="ts">
	import SidebarNav from '$lib/components/sidebar-nav.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Sheet from '$lib/components/ui/sheet';
	import { make_disabled, mask_gerber_file, millproject, paste_gerber_file, project_dir } from '$lib/store';
	import { writeTextFile } from '@tauri-apps/api/fs';
	import { Command } from '@tauri-apps/api/shell';
	import { CircuitBoard } from 'lucide-svelte';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';

	const sidebarNavItems = [
		{
			title: '0️⃣ Files',
			href: '/files'
		},
		{
			title: '1️⃣ Common',
			href: '/common'
		},
		{
			title: '2️⃣ Milling',
			href: '/milling'
		},
		{
			title: '3️⃣ Mask',
			href: '/mask'
		},
		{
			title: '4️⃣ Drill',
			href: '/drill'
		},
		{
			title: '5️⃣ Outline',
			href: '/outline'
		},
		{
			title: '6️⃣ Stencil',
			href: '/stencil'
		}
	];

	let _stdout = '';
	let _stderr = '';
	async function millproject_text() {
		let _millproject_text = '';
		let _command_arguments: string[] = [];
		let _stencil_arguments: string[] = [];
		let _mask_arguments: string[] = [];

		_millproject_text += '# files\n';
		const file_keys = Object.keys($millproject.files);
		file_keys.forEach((key) => {
			let k = $millproject.files[key as keyof typeof $millproject.files];
			if (k != '') {
				_millproject_text += `${key}=${k}\n`;
				_command_arguments.push(`--${key}=${k}`);
			}
		});

		_millproject_text += '\n# common options\n';
		const common_keys = Object.keys($millproject.common);
		common_keys.forEach((key) => {
			let k = $millproject.common[key as keyof typeof $millproject.common];
			if (k != null && (k as unknown) != '' && k != undefined && (k as unknown) != 'null') {
				_millproject_text += `${key}=${k}\n`;
				_command_arguments.push(`--${key}=${k}`);
			}
		});

		_millproject_text += '\n# milling options\n';
		const milling_keys = Object.keys($millproject.milling);
		milling_keys.forEach((key) => {
			let k = $millproject.milling[key as keyof typeof $millproject.milling];
			if (k != null && (k as unknown) != '' && k != undefined && (k as unknown) != 'null') {
				_millproject_text += `${key}=${k}\n`;
				_command_arguments.push(`--${key}=${k}`);
			}
		});

		_millproject_text += '\n# drill options\n';
		const drill_keys = Object.keys($millproject.drill);
		drill_keys.forEach((key) => {
			let k = $millproject.drill[key as keyof typeof $millproject.drill];
			if (k != null && (k as unknown) != '' && k != undefined && (k as unknown) != 'null') {
				_millproject_text += `${key}=${k}\n`;
				_command_arguments.push(`--${key}=${k}`);
			}
		});

		_millproject_text += '\n# outline options\n';
		const outline_keys = Object.keys($millproject.outline);
		outline_keys.forEach((key) => {
			let k = $millproject.outline[key as keyof typeof $millproject.outline];
			if (k != null && (k as unknown) != '' && k != undefined && (k as unknown) != 'null') {
				_millproject_text += `${key}=${k}\n`;
				_command_arguments.push(`--${key}=${k}`);
			}
		});

		_millproject_text += '\n# stencil options\n';
		_stencil_arguments.push(`--mill-feed=${$millproject.stencil['stencil-mill-feed']}`);
		_millproject_text += `stencil-mill-feed=${$millproject.stencil['stencil-mill-feed']}\n`;

		_stencil_arguments.push(`--mill-speed=${$millproject.stencil['stencil-mill-speed']}`);
		_millproject_text += `stencil-mill-speed=${$millproject.stencil['stencil-mill-speed']}\n`;

		_stencil_arguments.push(`--mill-diameters=${$millproject.stencil['stencil-mill-diameters']}`);
		_millproject_text += `stencil-mill-diameters=${$millproject.stencil['stencil-mill-diameters']}\n`;

		_stencil_arguments.push(`--invert-gerbers=${$millproject.stencil['stencil-invert-gerbers']}`);
		_millproject_text += `stencil-invert-gerbers=${$millproject.stencil['stencil-invert-gerbers']}\n`;

		_stencil_arguments.push(`--front-output=${$millproject.stencil['stencil-front-output']}`);
		_millproject_text += `stencil-front-output=${$millproject.stencil['stencil-front-output']}\n`;

		_stencil_arguments.push(`--milling-overlap=${$millproject.stencil['stencil-milling-overlap']}`);
		_millproject_text += `stencil-milling-overlap=${$millproject.stencil['stencil-milling-overlap']}\n`;

		_stencil_arguments.push(`--zwork=${$millproject.stencil['stencil-zwork']}`);
		_millproject_text += `stencil-zwork=${$millproject.stencil['stencil-zwork']}\n`;

		_stencil_arguments.push(`--front=${$paste_gerber_file}`);
		_stencil_arguments.push(`--zsafe=${$millproject.common.zsafe}`);
		_stencil_arguments.push(`--zchange=${$millproject.common.zchange}`);
		_stencil_arguments.push(`--metric=${$millproject.common.metric}`);
		_stencil_arguments.push(`--zero-start=${$millproject.common['zero-start']}`);

		if (
			$millproject.common['x-offset'] != null &&
			($millproject.common['x-offset'] as unknown) != '' &&
			$millproject.common['x-offset'] != undefined &&
			($millproject.common['x-offset'] as unknown) != 'null'
		) {
			_stencil_arguments.push(`--x-offset=${$millproject.common['x-offset']}`);
			_mask_arguments.push(`--x-offset=${$millproject.common['x-offset']}`);
		}

		if (
			$millproject.common['y-offset'] != null &&
			($millproject.common['y-offset'] as unknown) != '' &&
			$millproject.common['y-offset'] != undefined &&
			($millproject.common['y-offset'] as unknown) != 'null'
		) {
			_stencil_arguments.push(`--y-offset=${$millproject.common['y-offset']}`);
			_mask_arguments.push(`--y-offset=${$millproject.common['y-offset']}`);
		}

		if (
			$millproject.common['tile-x'] != null &&
			($millproject.common['tile-x'] as unknown) != '' &&
			$millproject.common['tile-x'] != undefined &&
			($millproject.common['tile-x'] as unknown) != 'null'
		) {
			_stencil_arguments.push(`--tile-x=${$millproject.common['tile-x']}`);
			_mask_arguments.push(`--tile-x=${$millproject.common['tile-x']}`);
		}

		if (
			$millproject.common['tile-y'] != null &&
			($millproject.common['tile-y'] as unknown) != '' &&
			$millproject.common['tile-y'] != undefined &&
			($millproject.common['tile-y'] as unknown) != 'null'
		) {
			_stencil_arguments.push(`--tile-y=${$millproject.common['tile-y']}`);
			_mask_arguments.push(`--tile-y=${$millproject.common['tile-y']}`);
		}

		if ($millproject.stencil['stencil-invert-gerbers']) {
			_stencil_arguments.push(`--isolation-width=1000`);
		}

		_millproject_text += '\n# mask options\n';
		_mask_arguments.push(`--mill-feed=${$millproject.mask['mask-mill-feed']}`);
		_millproject_text += `mask-mill-feed=${$millproject.mask['mask-mill-feed']}\n`;

		_mask_arguments.push(`--mill-speed=${$millproject.mask['mask-mill-speed']}`);
		_millproject_text += `mask-mill-speed=${$millproject.mask['mask-mill-speed']}\n`;

		_mask_arguments.push(`--mill-diameters=${$millproject.mask['mask-mill-diameters']}`);
		_millproject_text += `mask-mill-diameters=${$millproject.mask['mask-mill-diameters']}\n`;

		_mask_arguments.push(`--invert-gerbers=${$millproject.mask['mask-invert-gerbers']}`);
		_millproject_text += `mask-invert-gerbers=${$millproject.mask['mask-invert-gerbers']}\n`;

		_mask_arguments.push(`--front-output=${$millproject.mask['mask-front-output']}`);
		_millproject_text += `mask-front-output=${$millproject.mask['mask-front-output']}\n`;

		_mask_arguments.push(`--milling-overlap=${$millproject.mask['mask-milling-overlap']}`);
		_millproject_text += `mask-milling-overlap=${$millproject.mask['mask-milling-overlap']}\n`;

		_mask_arguments.push(`--zwork=${$millproject.mask['mask-zwork']}`);
		_millproject_text += `mask-zwork=${$millproject.mask['mask-zwork']}\n`;

		_mask_arguments.push(`--front=${$mask_gerber_file}`);
		_mask_arguments.push(`--zsafe=${$millproject.common.zsafe}`);
		_mask_arguments.push(`--zchange=${$millproject.common.zchange}`);
		_mask_arguments.push(`--metric=${$millproject.common.metric}`);
		_mask_arguments.push(`--zero-start=${$millproject.common['zero-start']}`);

		if ($millproject.mask['mask-invert-gerbers']) {
			_mask_arguments.push(`--isolation-width=1000`);
		}

		console.log('mask', _mask_arguments);
		console.log('stencil', _stencil_arguments);
		console.log('common', _command_arguments);

		_stdout = '';
		_stderr = '';
		const command = new Command('pcb2gcode', _command_arguments, { cwd: $project_dir });
		command.on('error', (error) => console.error(`command error: "${error}"`));
		command.stdout.on('data', (line) => (_stdout += line + '<br>'));
		command.stderr.on('data', (line) => (_stderr += line + '<br>'));
		await command.execute();

		_stdout += '<strong>Making stencil</strong>' + '<br>';
		const stencil_command = new Command('pcb2gcode', _stencil_arguments, { cwd: $project_dir });
		stencil_command.on('error', (error) => console.error(`command error: "${error}"`));
		stencil_command.stdout.on('data', (line) => (_stdout += line + '<br>'));
		stencil_command.stderr.on('data', (line) => (_stderr += line + '<br>'));
		await stencil_command.execute();

		_stdout += '<strong>Making mask</strong>' + '<br>';
		const mask_command = new Command('pcb2gcode', _mask_arguments, { cwd: $project_dir });
		mask_command.on('error', (error) => console.error(`command error: "${error}"`));
		mask_command.stdout.on('data', (line) => (_stdout += line + '<br>'));
		mask_command.stderr.on('data', (line) => (_stderr += line + '<br>'));
		await mask_command.execute();

		return _millproject_text;
	}

	async function make_files() {
		// console.log(dirname($millproject.files.front))
		const cross_platform_path = $millproject.files.front
			.replace(/[\\/]+/g, '/')
			.replace(/^(\.\/)/, '');
		const project_directory = cross_platform_path.substring(
			0,
			cross_platform_path.lastIndexOf('/') + 1
		);
		await writeTextFile(project_directory + 'millproject-kicnc', await millproject_text());
	}
</script>

<ModeWatcher />
<div class="flex min-h-screen w-full flex-col">
	<main
		class="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10"
	>
		<div class="mx-auto grid w-full max-w-6xl gap-2">
			<h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">
				<a class="flex underline" href="/"><CircuitBoard size={32} color="#191970" />KiCNC</a>
			</h3>
		</div>

		<div
			class="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]"
		>
			<nav
				class="sticky top-0 z-50 grid gap-4 text-sm text-muted-foreground"
				data-x-chunk-container="chunk-container after:right-0"
			>
				<aside class="-mx-4 lg:w-1/5">
					<SidebarNav items={sidebarNavItems} />
				</aside>

				<Sheet.Root>
					<Sheet.Trigger disabled={$make_disabled}><Button class="w-full" on:click={make_files} disabled={$make_disabled}>Make</Button></Sheet.Trigger>
					<Sheet.Content side="bottom">
						<Sheet.Header>
							<Sheet.Title>Output</Sheet.Title>
							<Sheet.Description>
								{@html _stdout}
								<div class="font-bold text-red-500">
									{@html _stderr}
								</div>
							</Sheet.Description>
						</Sheet.Header>
					</Sheet.Content>
				</Sheet.Root>
			</nav>
			<div class="grid gap-6">
				<slot />
			</div>
		</div>
	</main>
</div>
