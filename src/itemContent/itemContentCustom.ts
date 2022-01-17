import { v4 as uuidv4 } from "uuid";

import type {
  LayoutBlockItemContentData,
  ValidatedLayoutBlockItemContentData
} from "./itemContent";
import {RenderContext} from "../containerCustom";
import {OutputData} from "@editorjs/editorjs";

interface RenderItemContentProps extends RenderContext {
  data: OutputData;
  itemContentId: string;

}

const renderItemContent = ({
  EditorJS,
  data,
  dispatchData,
  editorJSConfig,
  itemContentId,
  readOnly,
  onFocusBlock,
}: RenderItemContentProps) => {
  const editorJSHolderID = uuidv4();
  const wrapper = document.createElement("div");

  wrapper.id = editorJSHolderID;

  new EditorJS({
    ...editorJSConfig,
    onFocusBlock,
    holder: editorJSHolderID,
    data,
    minHeight: 0,
    readOnly: readOnly,

    onChange: async (api: { saver: { save: () => any; }; }) => {
      const editorJSData = await api.saver.save();

      dispatchData(({itemContent, layout}) => ({
        itemContent: {
          ...itemContent,
          [itemContentId]: {
            blocks: editorJSData.blocks,
          },
        },
        layout: layout,
      }))
    }
  });

  return wrapper;
};


export { renderItemContent };
export type {
  LayoutBlockItemContentData,
  RenderItemContentProps,
  ValidatedLayoutBlockItemContentData,
};
