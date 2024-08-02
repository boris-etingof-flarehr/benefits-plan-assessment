import axios from 'axios';

type Event =
  | {
      type: 'assessment-viewed';
      data: {
        assessmentId: string;
        assessmentTitle: string;
      };
    }
  | {
      type: 'assessment-skipped';
      data: {
        assessmentId: string;
        assessmentTitle: string;
      };
    }
  | {
      type: 'assessment-field-updated';
      data: {
        assessmentId: string;
        assessmentTitle: string;
        customerAttribute: string;
      };
    }
  | {
      type: 'assessment-submitted';
      data: {
        assessmentId: string;
        assessmentTitle: string;
      };
    }
  | {
      type: 'assessment-summary-viewed';
      data: {
        assessmentId: string;
        assessmentTitle: string;
      };
    };

const track = async (event: string, properties: Record<string, string>): Promise<void> => {
  axios
    .post('/v2.0/analytics/track', {
      event,
      properties
    })
    .catch((_) => {});
};

const trace = (event: Event): Promise<void> => {
  switch (true) {
    case typeof event === 'object' && event.type === 'assessment-viewed':
      return track('Assessment Viewed', {
        id: event.data.assessmentId,
        name: event.data.assessmentTitle
      }) as unknown as Promise<void>;
    case typeof event === 'object' && event.type === 'assessment-skipped':
      return track('Assessment Skipped', {
        id: event.data.assessmentId,
        name: event.data.assessmentTitle
      }) as unknown as Promise<void>;
    case typeof event === 'object' && event.type === 'assessment-field-updated':
      return track('AssessmentField Updated', {
        id: event.data.assessmentId,
        name: event.data.assessmentTitle,
        attribute: event.data.customerAttribute
      }) as unknown as Promise<void>;
    case typeof event === 'object' && event.type === 'assessment-submitted':
      return track('Assessment Submitted', {
        id: event.data.assessmentId,
        name: event.data.assessmentTitle
      }) as unknown as Promise<void>;
    case typeof event === 'object' && event.type === 'assessment-summary-viewed':
      return track('AssessmentSummary Viewed', {
        id: event.data.assessmentId,
        name: event.data.assessmentTitle
      }) as unknown as Promise<void>;
  }

  return Promise.resolve();
};

const useTrace = (): { trace: typeof trace } => {
  return {
    trace
  };
};

export default useTrace;
