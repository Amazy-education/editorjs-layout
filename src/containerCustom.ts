import { EditorJSLayoutError } from "./EditorJSLayoutError";
import type {
  LayoutBlockToolConfig,
  LayoutBlockToolDispatchData,
} from "./LayoutBlockToolCustom";
import { renderItem } from "./itemCustom";
import type { LayoutBlockItemContentData } from "./itemContent/itemContentCustom";

import { LayoutBlockContainerData, ValidatedLayoutBlockContainerData } from "./container";


type OnFocusBlockInterface = ( index: number, holder: string ) => void;

interface RenderContext {
  EditorJS: LayoutBlockToolConfig["EditorJS"];
  dispatchData: LayoutBlockToolDispatchData;
  editorJSConfig: LayoutBlockToolConfig["editorJSConfig"];
  readOnly: boolean;
  onFocusBlock?: OnFocusBlockInterface;
}

interface RenderContainerProps extends RenderContext {
  data: LayoutBlockContainerData;
  itemContentData: LayoutBlockItemContentData;
}

const renderContainer = ({
                           data,
                           itemContentData,
                           ...context
                         }: RenderContainerProps) => {
  const wrapper = document.createElement("div");

  wrapper.id = data.id;
  wrapper.className = data.className;
  wrapper.style.cssText = data.style;

  data.children.forEach((child) => {
    let childElement: HTMLDivElement;

    switch (child.type) {
      case "container": {
        childElement = renderContainer({
          ...context,
          data: child,
          itemContentData,
        });

        break;
      }

      case "item": {
        childElement = renderItem({
          ...context,
          data: child,
          itemContentData,
        });

        break;
      }

      default: {
        const exhaustiveCheck: never = child;

        throw new EditorJSLayoutError();
      }
    }

    wrapper.append(childElement);
  });

  return wrapper;
};

export { renderContainer, RenderContainerProps };
export type { RenderContext,
  LayoutBlockContainerData,
  ValidatedLayoutBlockContainerData,
};
