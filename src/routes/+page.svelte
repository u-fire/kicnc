<script lang="ts">
	import * as Accordion from '$lib/components/ui/accordion/index.js';
	import { CirclePlus } from 'lucide-svelte';
</script>

<Accordion.Root class="w-full sm:max-w-[70%]">
	<Accordion.Item value="item-1">
		<Accordion.Trigger>KiCAD Gerber Plot Settings</Accordion.Trigger>
		<Accordion.Content>
			<p>
				✅ Check <code
					class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
					>Use drill/place file origin</code
				>
			</p>
			<p>
				🟩 Uncheck <code
					class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
					>Use extended X2 format (recommended)</code
				>
			</p>
		</Accordion.Content>
	</Accordion.Item>
	<Accordion.Item value="item-2">
		<Accordion.Trigger>KiCAD Drill Settings</Accordion.Trigger>
		<Accordion.Content>
			<p>
				✅ Check <code
					class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
					>PTH and NPTH in single file</code
				>
			</p>
		</Accordion.Content>
	</Accordion.Item>
	<Accordion.Item value="item-3">
		<Accordion.Trigger>Fiducial Use</Accordion.Trigger>
		<Accordion.Content>
			<p>
				📍 Place a fiducial on the bottom left of the board. Mark it as the <code
					class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
					>Drill/Place File Origin</code
				>. Ensure the fiducial is on all the layers that will be processed. This will ensure each
				layer lines up properly.
			</p>
		</Accordion.Content>
	</Accordion.Item>
	<Accordion.Item value="item-4">
		<Accordion.Trigger>Laser/Drillbit Workflow</Accordion.Trigger>
		<Accordion.Content>
			<p>0️⃣ Use paint/soldermasked blank PCBs.</p>
			<p>1️⃣ Mill copper layer by ablating the paint away.</p>
			<p>2️⃣ Etch away the exposed copper, leaving isolated traces, pads and annular rings.</p>
			<p>3️⃣ Ablate the mask layer, exposing the pads and annular rings.</p>
			<p>4️⃣ Drill holes.</p>
			<p>5️⃣ Cutout outline.</p>
			<p>
				6️⃣ Verify g-code using <a class="font-semibold underline" href="https://camotics.org/"
					>Camotics</a
				> or similar.
			</p>
			<p>
				7️⃣ Send the g-code to the CNC. <a
					class="font-semibold underline"
					href="https://sienci.com/gsender/">gSender</a
				>, <a class="font-semibold underline" href="https://winder.github.io/ugs_website/">UGS</a>,
				<a class="font-semibold underline" href="https://github.com/Denvi/Candle">Candle</a>.
			</p>
		</Accordion.Content>
	</Accordion.Item>
	<Accordion.Item value="item-5">
		<Accordion.Trigger>Drillbit Workflow</Accordion.Trigger>
		<Accordion.Content>
			<p>0️⃣ Create a heightmap of the mounted PCB blank.</p>
			<p>1️⃣ Mill copper layer.</p>
			<p>2️⃣ Drill holes.</p>
			<p>3️⃣ Cutout outline.</p>
			<p>
				4️⃣ Verify g-code using <a class="font-semibold underline" href="https://camotics.org/"
					>Camotics</a
				> or similar.
			</p>
			<p>
				5️⃣ Send the g-code to the CNC. <a
					class="font-semibold underline"
					href="https://sienci.com/gsender/">gSender</a
				>, <a class="font-semibold underline" href="https://winder.github.io/ugs_website/">UGS</a>,
				<a class="font-semibold underline" href="https://github.com/Denvi/Candle">Candle</a>.
			</p>
			<p>6️⃣ Apply soldermask.</p>
		</Accordion.Content>
	</Accordion.Item>
	<Accordion.Item value="item-6">
		<Accordion.Trigger>Laser Power/Spindle Speed</Accordion.Trigger>
		<Accordion.Content>
			<p>
				Min values are stored as g-code parameter
				<code
					class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
					>$30
				</code>
				and max value is
				<code
					class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
					>$31</code
				>. 
			</p>
			<p>If min is 0 and max is 255, then 128 would be half-power. If max was 10,000, then 5,000 would have half-power. </p>
			<p>
				Laser mode can be set with some hardware/software. It makes some operations quicker and
				skips others.
			</p>
		</Accordion.Content>
	</Accordion.Item>
	<Accordion.Item value="item-7">
		<Accordion.Trigger>New Project Settings</Accordion.Trigger>
		<Accordion.Content>
			<p>
				Each time the <code
					class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
					>Make</code
				> button is pressed, a filed named `millproject-kicnc` is created alongside the gerbers. This is the savefile KiCNC uses. It can be copied into a new directory without modification, just select the new gerber files in KiCNC and it will use all the copied settings. 
			</p>
		</Accordion.Content>
	</Accordion.Item>
</Accordion.Root>
<h2 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">About</h2>
<a
	class="font-medium text-primary underline underline-offset-4"
	href="https://github.com/u-fire/kicnc"
	target="_blank"
	rel="noopener noreferrer">https://github.com/u-fire/kicnc</a
>
<p class="font-medium">Version: <span class="text-sm text-muted-foreground">0.9.0</span></p>
<a
	class="font-medium text-primary underline underline-offset-4"
	href="https://microfire.co"
	target="_blank"
	rel="noopener noreferrer">Microfire LLC</a
>