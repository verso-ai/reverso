import FingerprintJS, { Agent } from '@fingerprintjs/fingerprintjs';
import React, {
  createContext,
  FC,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import { classNamesConcat } from '../../lib/utils';

export const SchemaContext = createContext({
  schema: { pages: [] },
  setSchema: (schema: any) => {
    console.log(schema);
  },
});

export const SubmissionContext = createContext({
  submission: {},
  setSubmission: (submission: any) => {
    console.log(submission);
  },
});

export const CurrentPageContext = createContext({
  currentPageIdx: 0,
  setCurrentPageIdx: (currentPageIdx: number) => {
    console.log(currentPageIdx);
  },
});

export const SubmitHandlerContext = createContext((pageName: string) => {
  console.log(pageName);
});

interface onSubmitProps {
  submission: any;
  schema: any;
}

interface Props {
  domain?: string;
  formId?: string;
  protocol?: 'http' | 'https';
  localOnly?: boolean;
  className?: string;
  onSubmit?: (obj: onSubmitProps) => void;
  children?: ReactNode;
}

export const ReversoForm: FC<Props> = ({
  domain = 'app.reverso.com',
  formId,
  protocol = 'https',
  localOnly = false,
  className = '',
  onSubmit = (): any => {},
  children,
}) => {
  const [schema, setSchema] = useState<any>({ pages: [] });
  const [submission, setSubmission] = useState<any>({});
  const [currentPageIdx, setCurrentPageIdx] = useState(0);
  const [submissionSessionId, setSubmissionSessionId] = useState('');
  const [fp, setFp] = useState<Agent>();

  useEffect(() => {
    FingerprintJS.load({ monitoring: false }).then(f => setFp(f));
  }, []);

  const handleSubmit = async (pageName: string) => {
    let _submissionSessionId = submissionSessionId;
    if (!localOnly) {
      // create answer session if it don't exist
      try {
        if (typeof fp === 'undefined') {
          console.error(
            `🦝 ReversoForms: Unable to send submission to reversoHub. Error: Can't initialize fingerprint`
          );
          return;
        }
        if (!formId) {
          console.warn(
            `🦝 ReversoForms: formId not set. Skipping sending submission to reversoHub.`
          );
          return;
        }
        if (!_submissionSessionId) {
          // get digital fingerprint of user for unique user feature
          const fpResult = await fp.get();
          // create new submissionSession in reversoHub

          const submissionSessionRes: any = await fetch(
            `${protocol}://${domain}/api/forms/${formId}/submissionSessions`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                userFingerprint: fpResult.visitorId,
              }),
            }
          );
          const submissionSession = await submissionSessionRes.json();
          _submissionSessionId = submissionSession.id;
          setSubmissionSessionId(_submissionSessionId);
        }
        // send answer to reverso platform
        await fetch(`${protocol}://${domain}/api/forms/${formId}/event`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            events: [
              {
                type: 'pageSubmission',
                data: {
                  pageName,
                  submissionSessionId: _submissionSessionId,
                  submission: submission[pageName],
                },
              },
              // update schema
              // TODO: do conditionally only when requested by the reversoHub
              { type: 'updateSchema', data: schema },
            ],
          }),
        });
      } catch (e) {
        console.error(
          `🦝 ReversoForms: Unable to send submission to reversoHub. Error: ${e}`
        );
      }
    }
    const maxPageIdx = schema.pages.length - 1;
    const hasThankYou = schema.pages[maxPageIdx].type === 'thankyou';
    if (currentPageIdx < maxPageIdx) {
      setCurrentPageIdx(currentPageIdx + 1);
    }
    if (
      (!hasThankYou && currentPageIdx === maxPageIdx) ||
      (hasThankYou && currentPageIdx === maxPageIdx - 1)
    ) {
      return onSubmit({ submission, schema });
    }
  };

  return (
    <SubmitHandlerContext.Provider value={handleSubmit}>
      <SchemaContext.Provider value={{ schema, setSchema }}>
        <SubmissionContext.Provider value={{ submission, setSubmission }}>
          <CurrentPageContext.Provider
            value={{ currentPageIdx, setCurrentPageIdx }}
          >
            <div className={classNamesConcat('max-w-lg', className)}>
              {children}
            </div>
          </CurrentPageContext.Provider>
        </SubmissionContext.Provider>
      </SchemaContext.Provider>
    </SubmitHandlerContext.Provider>
  );
};
