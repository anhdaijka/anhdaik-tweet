"use client";

import type { Value } from "@udecode/plate";

import { withProps } from "@udecode/cn";
import { AIPlugin } from "@udecode/plate-ai/react";
import {
	BoldPlugin,
	CodePlugin,
	ItalicPlugin,
	StrikethroughPlugin,
	SubscriptPlugin,
	SuperscriptPlugin,
	UnderlinePlugin,
} from "@udecode/plate-basic-marks/react";
import { BlockquotePlugin } from "@udecode/plate-block-quote/react";
import { CalloutPlugin } from "@udecode/plate-callout/react";
import {
	CodeBlockPlugin,
	CodeLinePlugin,
	CodeSyntaxPlugin,
} from "@udecode/plate-code-block/react";
import { CommentsPlugin } from "@udecode/plate-comments/react";
import { DatePlugin } from "@udecode/plate-date/react";
import { EmojiInputPlugin } from "@udecode/plate-emoji/react";
import { ExcalidrawPlugin } from "@udecode/plate-excalidraw/react";
import { HEADING_KEYS } from "@udecode/plate-heading";
import { TocPlugin } from "@udecode/plate-heading/react";
import { HighlightPlugin } from "@udecode/plate-highlight/react";
import { HorizontalRulePlugin } from "@udecode/plate-horizontal-rule/react";
import { KbdPlugin } from "@udecode/plate-kbd/react";
import { ColumnItemPlugin, ColumnPlugin } from "@udecode/plate-layout/react";
import { LinkPlugin } from "@udecode/plate-link/react";
import {
	EquationPlugin,
	InlineEquationPlugin,
} from "@udecode/plate-math/react";
import {
	AudioPlugin,
	FilePlugin,
	ImagePlugin,
	MediaEmbedPlugin,
	PlaceholderPlugin,
	VideoPlugin,
} from "@udecode/plate-media/react";
import {
	MentionInputPlugin,
	MentionPlugin,
} from "@udecode/plate-mention/react";
import { SlashInputPlugin } from "@udecode/plate-slash-command/react";
import { SuggestionPlugin } from "@udecode/plate-suggestion/react";
import {
	TableCellHeaderPlugin,
	TableCellPlugin,
	TablePlugin,
	TableRowPlugin,
} from "@udecode/plate-table/react";
import { TogglePlugin } from "@udecode/plate-toggle/react";
import {
	type CreatePlateEditorOptions,
	ParagraphPlugin,
	PlateLeaf,
	usePlateEditor,
} from "@udecode/plate/react";

import { copilotPlugins } from "@/components/editor/copilot-plugins";
import { editorPlugins } from "@/components/editor/editor-plugins";
import { FixedToolbarPlugin } from "@/components/editor/fixed-toolbar-plugin";
import { FloatingToolbarPlugin } from "@/components/editor/floating-toolbar-plugin";
import { AILeaf } from "@/components/ai/ai-leaf";
import { BlockquoteElement } from "@/components/editor/blockquote-element";
import { CalloutElement } from "@/components/editor/callout-element";
import { CodeBlockElement } from "@/components/editor/code-block-element";
import { CodeLeaf } from "@/components/editor/code-leaf";
import { CodeLineElement } from "@/components/editor/code-line-element";
import { CodeSyntaxLeaf } from "@/components/editor/code-syntax-leaf";
import { ColumnElement } from "@/components/editor/column-element";
import { ColumnGroupElement } from "@/components/editor/column-group-element";
import { CommentLeaf } from "@/components/editor/comment-leaf";
import { DateElement } from "@/components/editor/date-element";
import { EmojiInputElement } from "@/components/editor/emoji-input-element";
import { EquationElement } from "@/components/editor/equation-element";
import { ExcalidrawElement } from "@/components/editor/excalidraw-element";
import { HeadingElement } from "@/components/editor/heading-element";
import { HighlightLeaf } from "@/components/editor/highlight-leaf";
import { HrElement } from "@/components/editor/hr-element";
import { ImageElement } from "@/components/editor/image-element";
import { InlineEquationElement } from "@/components/editor/inline-equation-element";
import { KbdLeaf } from "@/components/editor/kbd-leaf";
import { LinkElement } from "@/components/editor/link-element";
import { MediaAudioElement } from "@/components/editor/media-audio-element";
import { MediaEmbedElement } from "@/components/editor/media-embed-element";
import { MediaFileElement } from "@/components/editor/media-file-element";
import { MediaPlaceholderElement } from "@/components/editor/media-placeholder-element";
import { MediaVideoElement } from "@/components/editor/media-video-element";
import { MentionElement } from "@/components/editor/mention-element";
import { MentionInputElement } from "@/components/editor/mention-input-element";
import { ParagraphElement } from "@/components/editor/paragraph-element";
import { withPlaceholders } from "@/components/editor/placeholder";
import { SlashInputElement } from "@/components/editor/slash-input-element";
import { SuggestionLeaf } from "@/components/editor/suggestion-leaf";
import {
	TableCellElement,
	TableCellHeaderElement,
} from "@/components/editor/table-cell-element";
import { TableElement } from "@/components/editor/table-element";
import { TableRowElement } from "@/components/editor/table-row-element";
import { TocElement } from "@/components/editor/toc-element";
import { ToggleElement } from "@/components/editor/toggle-element";

export const viewComponents = {
	[AudioPlugin.key]: MediaAudioElement,
	[BlockquotePlugin.key]: BlockquoteElement,
	[BoldPlugin.key]: withProps(PlateLeaf, { as: "strong" }),
	[CalloutPlugin.key]: CalloutElement,
	[CodeBlockPlugin.key]: CodeBlockElement,
	[CodeLinePlugin.key]: CodeLineElement,
	[CodePlugin.key]: CodeLeaf,
	[CodeSyntaxPlugin.key]: CodeSyntaxLeaf,
	[ColumnItemPlugin.key]: ColumnElement,
	[ColumnPlugin.key]: ColumnGroupElement,
	[CommentsPlugin.key]: CommentLeaf,
	[DatePlugin.key]: DateElement,
	[EquationPlugin.key]: EquationElement,
	[ExcalidrawPlugin.key]: ExcalidrawElement,
	[FilePlugin.key]: MediaFileElement,
	[HEADING_KEYS.h1]: withProps(HeadingElement, { variant: "h1" }),
	[HEADING_KEYS.h2]: withProps(HeadingElement, { variant: "h2" }),
	[HEADING_KEYS.h3]: withProps(HeadingElement, { variant: "h3" }),
	[HEADING_KEYS.h4]: withProps(HeadingElement, { variant: "h4" }),
	[HEADING_KEYS.h5]: withProps(HeadingElement, { variant: "h5" }),
	[HEADING_KEYS.h6]: withProps(HeadingElement, { variant: "h6" }),
	[HighlightPlugin.key]: HighlightLeaf,
	[HorizontalRulePlugin.key]: HrElement,
	[ImagePlugin.key]: ImageElement,
	[InlineEquationPlugin.key]: InlineEquationElement,
	[ItalicPlugin.key]: withProps(PlateLeaf, { as: "em" }),
	[KbdPlugin.key]: KbdLeaf,
	[LinkPlugin.key]: LinkElement,
	[MediaEmbedPlugin.key]: MediaEmbedElement,
	[MentionPlugin.key]: MentionElement,
	[ParagraphPlugin.key]: ParagraphElement,
	[PlaceholderPlugin.key]: MediaPlaceholderElement,
	[StrikethroughPlugin.key]: withProps(PlateLeaf, { as: "s" }),
	[SubscriptPlugin.key]: withProps(PlateLeaf, { as: "sub" }),
	[SuggestionPlugin.key]: SuggestionLeaf,
	[SuperscriptPlugin.key]: withProps(PlateLeaf, { as: "sup" }),
	[TableCellHeaderPlugin.key]: TableCellHeaderElement,
	[TableCellPlugin.key]: TableCellElement,
	[TablePlugin.key]: TableElement,
	[TableRowPlugin.key]: TableRowElement,
	[TocPlugin.key]: TocElement,
	[TogglePlugin.key]: ToggleElement,
	[UnderlinePlugin.key]: withProps(PlateLeaf, { as: "u" }),
	[VideoPlugin.key]: MediaVideoElement,
};

export const editorComponents = {
	...viewComponents,
	[AIPlugin.key]: AILeaf,
	[EmojiInputPlugin.key]: EmojiInputElement,
	[MentionInputPlugin.key]: MentionInputElement,
	[SlashInputPlugin.key]: SlashInputElement,
};

export const useCreateEditor = (
	{
		components,
		override,
		placeholders,
		readOnly,
		...options
	}: {
		components?: Record<string, any>;
		placeholders?: boolean;
		plugins?: any[];
		readOnly?: boolean;
	} & Omit<CreatePlateEditorOptions, "plugins"> = {},
	deps: any[] = []
) => {
	return usePlateEditor<Value, (typeof editorPlugins)[number]>(
		{
			override: {
				components: {
					...(readOnly
						? viewComponents
						: placeholders
						? withPlaceholders(editorComponents)
						: editorComponents),
					...components,
				},
				...override,
			},
			plugins: [
				...copilotPlugins,
				...editorPlugins,
				FixedToolbarPlugin,
				FloatingToolbarPlugin,
			],
			value: [
				{
					children: [{ text: "Playground" }],
					type: "h1",
				},
				{
					children: [
						{ text: "A rich-text editor with AI capabilities. Try the " },
						{ bold: true, text: "AI commands" },
						{ text: " or use " },
						{ kbd: true, text: "Cmd+J" },
						{ text: " to open the AI menu." },
					],
					type: ParagraphPlugin.key,
				},
			],
			...options,
		},
		deps
	);
};
